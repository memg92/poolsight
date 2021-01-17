from app.models import db, Task, Repair
from faker import Faker


fake = Faker()


def seed_tasks():
    try:
        repair = Repair.query.first()
    except:
        repair = {id: 1}

    for i in range(10):
        task = Task(
            repair_id=i + repair.id,
            title='New Lights',
            category='Lights',
            rate='100',
            cost='60',
            description='Replaced lights, charging cost plus',
            created_at=fake.date_between(
                start_date='-3y', end_date='today'),
            updated_at=fake.date_time(),
        )
        db.session.add(task)
        db.session.commit()

# Uses a raw SQL query to TRUNCATE the tasks table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_tasks():
    db.session.execute('TRUNCATE tasks;')
    db.session.commit()
