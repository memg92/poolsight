from flask import Blueprint, jsonify, session, request
from app.models import Client, Pool, db
from flask_login import current_user, login_required
from app.forms import NewPoolForm

pools_routes = Blueprint('pools', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@pools_routes.route('/')
@login_required
def get_all_pools():
    """
    /api/pools/ gets all pools for an authenticated user
    """
    user = current_user
    # print("\n\n\nuser", user, "\n\n\n")
    # return
    if(user.id):
        pools = Pool.query.filter_by(user_id=user.id).all()
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

    if form.validate_on_submit():
        pool = pool(
            user_id=user.id,
            client_id=form.data['clientId'],
            street=form.data['street'],
            city=form.data['city'],
            state=form.data['state'],
            pool_size=form.data['poolSize'],
            property_type=form.data['propertyType'],
            monthly_rate=form.data['monthlyRate'],
            service_day=form.data['serviceDay'],
            filter_change=form.data['filterChanged'],
        )
        db.session.add(pool)
        db.session.commit()
        return pool.to_dict_client()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@pools_routes.route('/<int:client_id>')
@login_required
def get_pools(client_id):
    """
    /api/pools/<client_id> gets all pools for a specific client
    """
    user = current_user
    if user.id:
        pools = Pool.query.filter_by(client_id=client_id).all()

        # check if client has pools
        if pools:
            return {"pools": [pool.to_dict_client() for pool in pools]}
        return {"error": "Client has no pools"}
    return {"error": "Unauthorized"}, 401
