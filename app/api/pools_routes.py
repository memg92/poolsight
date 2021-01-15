from flask import Blueprint, jsonify, session, request
from app.models import Client, Pool, Repair, db
from flask_login import current_user, login_required
from app.forms import NewPoolForm
from sqlalchemy.orm import joinedload

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


@ pools_routes.route('/<int:pool_id>', methods=["DELETE"])
@ login_required
def delete_pool(pool_id):
    pool = Pool.query.get(pool_id)
    user = current_user
    if pool is not None:
        # check if pool belongs to user
        if pool.user_id != user.id:
            return {"error": "Unauthorized"}, 401

        db.session.delete(pool)
        db.session.commit()
        return {"deleted": pool_id}
    else:
        return {"error": f'id {pool_id} not found'}
