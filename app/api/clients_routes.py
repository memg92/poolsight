from flask import Blueprint, jsonify, session, request
from app.models import Client, db
from app.forms import NewClientForm
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

clients_routes = Blueprint('clients', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@clients_routes.route('/all')
@login_required
def get_all_clients():
    """
    /api/clients/<user_id> gets all clients for an authenticated user
    """
    user = current_user
    # print("\n\n\nuser", user, "\n\n\n")
    # return
    if(user.id):
        clients = Client.query.filter_by(user_id=user_id).all()
        client_data = [client.to_dict() for client in clients]
        print("\n\n\n", client_data, "\n\n\n")
        if clients:
            return {"clients": client_data}
        return {"error": "No clients found"}
    return {"error": "Unauthorized"}, 401


@clients_routes.route('/<int:client_id>')
@login_required
def get_clients(client_id):
    """
    /api/clients/<client_id> gets a specific client for an authenticated user
    """
    user = current_user
    if(user.id):
        client = Client.query.options(
            joinedload(Client.pools)).filter_by(id=client_id).first()
        if client:
            return {"client": client.to_dict_pools()}

        return {"error": "No clients found"}
    return {"error": "Unauthorized"}, 401

# [pledge.to_dict_projects() for pledge in pledges]


@ clients_routes.route('', methods=['POST'])
@ login_required
def create_client():
    """
    Creates a new client
    """
    form = NewClientForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        client = Client(
            user_id=current_user.get_id(),
            firstname=form.data['firstname'],
            lastname=form.data['lastname'],
            street=form.data['street'],
            city=form.data['city'],
            state=form.data['state'],
            phone=form.data['phone'],
            email=form.data['email'],
        )
        db.session.add(client)
        db.session.commit()
        return client.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@clients_routes.route('/<int:client_id>', methods=["PUT"])
def edit_client(client_id):
    data = request.get_json()
    client = Client.query.get(client_id)

    if client:
        client.firstname = data['userId']
        client.lastname = data['lastname']
        client.street = data['street']
        client.city = data['city']
        client.state = data['state']
        client.email = data['email']
        client.phone = data['phone']
        db.session.commit()
        return client.to_dict()
    return {'error': 'Client not found'}, 400
