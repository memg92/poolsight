from app.models import db, Task, Repair
from faker import Faker


fake = Faker()


def seed_tasks():
    try:
        repair = Repair.query.first()
    except:
        repair = {id: 1}

    for i in range(15):
        task = Task(
            repair_id=i + repair.id,
            title='New Lights',
            rate=100,
            cost=60,
            description='Replaced lights, charging cost plus',
            complete=True,
            created_at=fake.date_between(
                start_date='-1y', end_date='-1m'),
            updated_at=fake.date_between(
                start_date='-1m', end_date='today'),
        )
        db.session.add(task)
    for i in range(15, 30):
        task = Task(
            repair_id=i + repair.id,
            title='Replaced filter (cost plus)',
            rate=100,
            cost=60,
            description='Bought and installed new filter for client',
            complete=True,
            created_at=fake.date_between(
                start_date='-1y', end_date='today'),
            updated_at=fake.date_between(
                start_date='-1m', end_date='today'),
        )
        db.session.add(task)
    for i in range(30, 45):
        task = Task(
            repair_id=i + repair.id,
            title='Outsourced leak detection',
            rate=0,
            cost=60,
            description='Leak detection done by 3rd party. Determining best way forward',
            complete=True,
            created_at=fake.date_between(
                start_date='-1y', end_date='today'),
            updated_at=fake.date_between(
                start_date='-6m', end_date='today'),
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
