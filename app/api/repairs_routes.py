from flask import Blueprint, jsonify, session, request
from app.models import Client, Pool, Repair, db
from flask_login import current_user, login_required
from app.forms import NewRepairForm
from datetime import datetime


repairs_routes = Blueprint('repairs', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field.title()} : {error}")
    return errorMessages


@repairs_routes.route('')
@login_required
def get_all_repairs():
    """
    /api/repairs gets all repairs for an authenticated user
    """
    user = current_user
    # print("\n\n\nuser", user, "\n\n\n")
    # return
    if(user.id):
        repairs = Repair.query.filter_by(
            user_id=user.id).order_by(Repair.updated_at.desc()).all()
        repair_data = [repair.to_dict_client() for repair in repairs]
        if repairs:
            return {"repairs": repair_data}
        return {"error": "No repairs found"}
    return {"error": "Unauthorized"}, 401


@ repairs_routes.route('', methods=['POST'])
@ login_required
def create_repair():
    """
    Creates a new repair
    """
    form = NewRepairForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user = current_user
    if not user:
        return {'error': 'Unauthorized'}, 401
    # print('\n\n\n form:', form.validate_on_submit(), form.errors, '\n\n\n')
    if form.validate_on_submit():
        # make sure pool exists
        pool = Pool.query.get(form.data['poolId'])
        if pool:
            repair = Repair(
                pool_id=form.data['poolId'],
                title=form.data['title'],
                description=form.data['description'],
            )
            # print('\n\n\n repair:', repair.to_dict(), '\n\n\n')
            db.session.add(repair)
            db.session.commit()
            return {'repair': repair.to_dict()}
        return {'error': f'No pool ID {form.data["poolId"]} found'}
    return {'errors': validation_errors_to_error_messages(form.errors)}


@ repairs_routes.route('/<int:repair_id>', methods=["PUT"])
@ login_required
def edit_repair(repair_id):
    data = request.get_json()
    repair = Repair.query.get(repair_id)

    if repair:
        repair.pool_id = data['poolId']
        repair.title = data['title']
        repair.description = data['description']
        repair.updated_at = datetime.now()
        db.session.commit()
        return repair.to_dict()
    return {'error': 'repair not found'}, 400


@ repairs_routes.route('/<int:client_id>')
@ login_required
def get_repairs(client_id):
    """
    /api/repairs/<client_id> gets all repairs for a specific client
    """
    user = current_user
    if user.id:
        repairs = Repair.query.filter_by(
            client_id=client_id).order_by(Repair.updated_at.desc()).all()

        # check if client has repairs
        print(repairs)
        if repairs:
            return {"repairs": [repair.to_dict_client() for repair in repairs]}
        return {"error": "Client has no repairs"}
    return {"error": "Unauthorized"}, 401


@ repairs_routes.route('/<int:repair_id>', methods=["DELETE"])
@ login_required
def delete_repair(repair_id):
    repair = Repair.query.get(repair_id)

    if repair is not None:
        db.session.delete(repair)
        db.session.commit()
        return {"deleted": repair_id}
    else:
        return {"error": f'id {repair_id} not found'}
