from app.models import db, Client
from faker import Faker


fake = Faker()


def seed_clients():

    for i in range(10):
        client = Client(
            user_id=1,
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            street=fake.street_address(),
            city=fake.city(),
            state="FL",
            email=fake.email(),
            phone=fake.phone_number(),
            pool_size=20,
            property_type="Residential",
            monthly_rate=80,
            service_day="M",
            filter_changed=fake.date_time(),
            created_at=fake.date_time(),
            updated_at=fake.date_time(),
        )
        db.session.add(client)
        db.session.commit()

    for i in range(10):
        client = Client(
            user_id=1,
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            street=fake.street_address(),
            city=fake.city(),
            state="FL",
            email=fake.email(),
            phone=fake.phone_number(),
            pool_size=20,
            property_type="Commercial",
            monthly_rate=80,
            service_day="T",
            filter_changed=fake.date_time(),
            created_at=fake.date_time(),
            updated_at=fake.date_time(),
        )
        db.session.add(client)
        db.session.commit()

    for i in range(10):
        client = Client(
            user_id=1,
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            street=fake.street_address(),
            city=fake.city(),
            state="FL",
            email=fake.email(),
            phone=fake.phone_number(),
            pool_size=20,
            property_type="Residential",
            monthly_rate=80,
            service_day="W",
            filter_changed=fake.date_time(),
            created_at=fake.date_time(),
            updated_at=fake.date_time(),
        )
        db.session.add(client)
        db.session.commit()

    for i in range(10):
        client = Client(
            user_id=1,
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            street=fake.street_address(),
            city=fake.city(),
            state="FL",
            email=fake.email(),
            phone=fake.phone_number(),
            pool_size=40,
            property_type="Residential",
            monthly_rate=85,
            service_day="R",
            filter_changed=fake.date_time(),
            created_at=fake.date_time(),
            updated_at=fake.date_time(),
        )
        db.session.add(client)
        db.session.commit()

    for i in range(10):
        client = Client(
            user_id=1,
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            street=fake.street_address(),
            city=fake.city(),
            state="FL",
            email=fake.email(),
            phone=fake.phone_number(),
            pool_size=30,
            property_type="Commercial",
            monthly_rate=75,
            service_day="F",
            filter_changed=fake.date_time(),
            created_at=fake.date_time(),
            updated_at=fake.date_time(),
        )
        db.session.add(client)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the clients table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_clients():
    db.session.execute('TRUNCATE clients;')
    db.session.commit()
