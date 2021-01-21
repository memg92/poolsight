from flask import Blueprint, jsonify, session, request
from app.models import Client, Pool, Repair, Task, db
from flask_login import current_user, login_required
from app.forms import NewPoolForm
from itertools import chain
from sqlalchemy.orm import joinedload
from sqlalchemy import or_

pools_routes = Blueprint('pools', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field.title()} : {error}")
    return errorMessages


@pools_routes.route('')
@login_required
def get_all_pools():
    """
    /api/pools/ gets all pools for an authenticated user
    """
    user = current_user
    # print("\n\n\nuser", user, "\n\n\n")
    # return
    if(user.id):
        pools = Pool.query.filter_by(
            user_id=user.id).order_by(Pool.updated_at.desc()).all()
        pool_data = [pool.to_dict_client() for pool in pools]
        if pools:
            return {"pools": pool_data}
        return {"error": "No pools found"}
    return {"error": "Unauthorized"}, 401


@ pools_routes.route('', methods=['POST'])
@ login_required
def create_pool():
    """
    Creates a new pool
    """
    form = NewPoolForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user = current_user
    if not user:
        return {'error': 'Unauthorized'}, 401
    # print('\n\n\n form:', form.validate_on_submit(), form.errors, '\n\n\n')
    if form.validate_on_submit():
        pool = Pool(
            user_id=user.id,
            client_id=form.data['clientId'],
            street=form.data['street'],
            city=form.data['city'],
            state=form.data['state'],
            pool_size=form.data['poolSize'],
            property_type=form.data['propertyType'],
            monthly_rate=form.data['monthlyRate'],
            service_day=form.data['serviceDay'],
            filter_changed=form.data['filterChanged'],
        )
        # print('\n\n\n pool:', pool.to_dict(), '\n\n\n')
        db.session.add(pool)
        db.session.commit()
        return {'pool': pool.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}


@ pools_routes.route('/<int:client_id>')
@ login_required
def get_pools(client_id):
    """
    /api/pools/<client_id> gets all pools for a specific client, including client and repair data
    """
    user = current_user
    if user.id:
        pools = Pool.query.options(joinedload(Pool.repairs)).filter_by(
            client_id=client_id, user_id=user.id).order_by(Pool.updated_at.desc()).all()

        # print('\n\n\n pools:', pools, '\n\n\n')
        # check if client has pools
        if pools:
            return {"pools": [pool.to_dict_full() for pool in pools]}
        return {"error": "No pools matched client ID"}
    return {"error": "Unauthorized"}, 401


@ pools_routes.route('/search/<query>')
@ login_required
def search_query(query):
    """
    /api/pools/search/<query> searches pool, client, and repair tables for key words
    """
    user = current_user
    if user.id:
        # check if query has multiple words
        if query.find('+') != -1:
            # split query into multiple keywords
            keywords = query.split('+')
            # filters for each word if there are multiple keywords
            repair_filter = list(chain.from_iterable((Repair.title.ilike(
                f'%{keyword}%'), Repair.description.ilike(
                f'%{keyword}%')) for keyword in keywords))
            client_filter = list(chain.from_iterable((Client.firstname.ilike(
                f'%{keyword}%'), Client.lastname.ilike(
                f'%{keyword}%'), Client.street.ilike(
                f'%{keyword}%'), Client.city.ilike(
                f'%{keyword}%')) for keyword in keywords))

            # query repair and pool tables using modified filter clauses for multiple keywords
            repair_data = Repair.query.filter(
                or_(*repair_filter)).order_by(Repair.updated_at.desc()).all()
            pool_data = Pool.query.join(Pool.client).filter(
                or_(*client_filter)).order_by(Pool.updated_at.desc()).all()
        else:
            # query repair and pool tables using regular single keyword filters
            repair_data = Repair.query.filter(or_(Repair.title.ilike(f"%{query}%"), Repair.description.ilike(
                f"%{query}%"))).order_by(Repair.updated_at.desc()).all()

            pool_data = Pool.query.join(Pool.client).filter(or_(Client.firstname.ilike(f"%{query}%"), Client.lastname.ilike(
                f"%{query}%"), Client.street.ilike(f"%{query}%"), Client.city.ilike(f"%{query}%"))).order_by(Pool.updated_at.desc()).all()

        data = {}
        if repair_data:
            data["repairs"] = [repair.to_dict_full() for repair in repair_data]
        if pool_data:
            data["pools"] = [pool.to_dict_full() for pool in pool_data]
        if data:
            return {"data": data}
        return {"error": "No matches found"}
    return {"error": "Unauthorized"}, 401


@ pools_routes.route('/<int:pool_id>', methods=["DELETE"])
@ login_required
def delete_pool(pool_id):
    pool = Pool.query.get(pool_id)
    pool_data = pool.to_dict_full()
    user = current_user
    if pool is not None:
        # check if pool belongs to user
        if pool.user_id != user.id:
            return {"error": "Unauthorized"}, 401

        db.session.delete(pool)
        db.session.commit()
        return {"deleted": pool_data}
    else:
        return {"error": f'id {pool_id} not found'}
