from flask import Blueprint, jsonify, session, request
from app.models import Client, Pool, Repair, Task, db
from flask_login import current_user, login_required
from app.forms import NewTaskForm
from datetime import datetime


tasks_routes = Blueprint('tasks', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field.title()} : {error}")
    return errorMessages


@ tasks_routes.route('', methods=['POST'])
@ login_required
def create_task():
    """
    Creates a new task
    """
    form = NewTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user = current_user
    if not user:
        return {'error': 'Unauthorized'}, 401
    # print('\n\n\n form:', form.validate_on_submit(), form.errors, '\n\n\n')
    if form.validate_on_submit():
        # check that repair exists
        try:
            repair = Repair.query.get(form.data['repairId'])
        except TypeError:
            return {'error': f'Repair ID {form.data["repairId"]} was invalid'}

        if repair:
            task = Task(
                repair_id=form.data['repairId'],
                title=form.data['title'],
                category=form.data['category'],
                rate=form.data['rate'],
                cost=form.data['cost'],
                description=form.data['description'],
            )
            # print('\n\n\n task:', task.to_dict(), '\n\n\n')
            db.session.add(task)
            db.session.commit()
            return {'task': task.to_dict()}
        return {'error': f'No repair with ID {form.data["repairId"]} found'}
    return {'errors': validation_errors_to_error_messages(form.errors)}

# not sure I will need this
# @ tasks_routes.route('/<int:client_id>')
# @ login_required
# def get_tasks(client_id):
#     """
#     /api/tasks/<client_id> gets all tasks for a specific client
#     """
#     user = current_user
#     if user.id:
#         tasks = Task.query.filter_by(
#             client_id=client_id).order_by(Task.updated_at.desc()).all()

#         # check if client has tasks
#         print(tasks)
#         if tasks:
#             return {"tasks": [task.to_dict_client() for task in tasks]}
#         return {"error": "Client has no tasks"}
#     return {"error": "Unauthorized"}, 401


@ tasks_routes.route('/<int:task_id>', methods=["PUT"])
@ login_required
def edit_task(task_id):
    data = request.get_json()
    task = Task.query.get(task_id)
    # print(data)
    if task:
        task.title = data['title']
        task.category = data['category']
        task.rate = data['rate']
        task.cost = data['cost']
        task.description = data['description']
        task.updated_at = datetime.now()
        db.session.commit()
        return task.to_dict()
    return {'error': 'task not found'}, 400


@ tasks_routes.route('/<int:task_id>', methods=["DELETE"])
@ login_required
def delete_task(task_id):
    task = Task.query.get(task_id)

    if task is not None:
        db.session.delete(task)
        db.session.commit()
        return {"deleted": task_id}
    else:
        return {"error": f'id {task_id} not found'}
