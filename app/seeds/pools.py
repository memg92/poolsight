from app.models import db, Pool
from faker import Faker


fake = Faker()


def seed_pools():

    for i in range(10):
        pool = Pool(
            user_id=1,
            client_id=i + 1,
            street=fake.street_address(),
            city=fake.city(),
            state="FL",
            pool_size=20,
            property_type="Residential",
            monthly_rate=80,
            service_day="M",
            filter_changed=fake.date_time(),
            created_at=fake.date_time(),
            updated_at=fake.date_time(),
        )
        db.session.add(pool)
        db.session.commit()

    for i in range(11, 20):
        pool = Pool(
            user_id=1,
            client_id=i + 1,
            street=fake.street_address(),
            city=fake.city(),
            state="FL",
            pool_size=20,
            property_type="Commercial",
            monthly_rate=80,
            service_day="T",
            filter_changed=fake.date_time(),
            created_at=fake.date_time(),
            updated_at=fake.date_time(),
        )
        db.session.add(pool)
        db.session.commit()

    for i in range(21, 30):
        pool = Pool(
            user_id=1,
            client_id=i + 1,
            street=fake.street_address(),
            city=fake.city(),
            state="FL",
            pool_size=20,
            property_type="Residential",
            monthly_rate=80,
            service_day="W",
            filter_changed=fake.date_time(),
            created_at=fake.date_time(),
            updated_at=fake.date_time(),
        )
        db.session.add(pool)
        db.session.commit()

    for i in range(31, 40):
        pool = Pool(
            user_id=1,
            client_id=i + 1,
            street=fake.street_address(),
            city=fake.city(),
            state="FL",
            pool_size=40,
            property_type="Residential",
            monthly_rate=85,
            service_day="R",
            filter_changed=fake.date_time(),
            created_at=fake.date_time(),
            updated_at=fake.date_time(),
        )
        db.session.add(pool)
        db.session.commit()

    for i in range(41, 50):
        pool = Pool(
            user_id=1,
            client_id=i + 1,
            street=fake.street_address(),
            city=fake.city(),
            state="FL",
            pool_size=30,
            property_type="Commercial",
            monthly_rate=75,
            service_day="F",
            filter_changed=fake.date_time(),
            created_at=fake.date_time(),
            updated_at=fake.date_time(),
        )
        db.session.add(pool)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the pools table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_pools():
    db.session.execute('TRUNCATE pools;')
    db.session.commit()
