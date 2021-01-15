from app.models import db, Repair, Pool
from faker import Faker


fake = Faker()


def seed_repairs():
    try:
        pool = Pool.query.first()
    except:
        pool = {id: 1}

    for i in range(10):
        repair = Repair(
            pool_id=i + pool.id,
            title='Underwater Lights',
            description='Client reported broken lights. Replacing with new ones.',
            created_at=fake.date_time(),
            updated_at=fake.date_time(),
        )
        db.session.add(repair)
        db.session.commit()

    for i in range(11, 20):
        repair = Repair(
            pool_id=i + pool.id,
            title='Underwater Lights',
            description='Client reported broken lights. Replacing with new ones.',
            created_at=fake.date_time(),
            updated_at=fake.date_time(),

        )
        db.session.add(repair)
        db.session.commit()

    for i in range(21, 30):
        repair = Repair(
            pool_id=i + pool.id,
            title='Underwater Lights',
            description='Client reported broken lights. Replacing with new ones.',
            created_at=fake.date_time(),
            updated_at=fake.date_time(),

        )
        db.session.add(repair)
        db.session.commit()

    for i in range(31, 40):
        repair = Repair(
            pool_id=i + pool.id,
            title='Underwater Lights',
            description='Client reported broken lights. Replacing with new ones.',
            created_at=fake.date_time(),
            updated_at=fake.date_time(),

        )
        db.session.add(repair)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the repairs table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_repairs():
    db.session.execute('TRUNCATE repairs;')
    db.session.commit()
