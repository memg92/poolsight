from app.models import db, Repair, Pool
from faker import Faker


fake = Faker()


def seed_repairs():
    try:
        pool = Pool.query.first()
    except:
        pool = {id: 1}

    for i in range(15):
        repair = Repair(
            pool_id=i + pool.id,
            title='Underwater Lights',
            description='Client reported broken lights. Replacing with new ones.',
            created_at=fake.date_between(
                start_date='-3y', end_date='-1y'),
            updated_at=fake.date_between(
                start_date='-1y', end_date='today'),
        )
        db.session.add(repair)
    for i in range(15, 30):
        repair = Repair(
            pool_id=i + pool.id,
            title='Changed Filter',
            description='Routine filter change (6 months).',
            created_at=fake.date_between(
                start_date='-1y', end_date='-1y'),
            updated_at=fake.date_between(
                start_date='-1m', end_date='today'),
        )
        db.session.add(repair)
    for i in range(30, 45):
        repair = Repair(
            pool_id=i + pool.id,
            title='Leak Detection',
            description='Fixing leak found in the main drain',
            created_at=fake.date_between(
                start_date='-2y', end_date='-1y'),
            updated_at=fake.date_between(
                start_date='-1y', end_date='today'),
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
