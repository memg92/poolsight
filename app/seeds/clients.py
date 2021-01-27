from app.models import db, User, Client
from faker import Faker


fake = Faker()


def seed_clients():
    try:
        user = User.query.first()
    except:
        user = {id: 1}

    for i in range(15):
        client = Client(
            user_id=user.id,
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            street=fake.street_address(),
            city="Boca Raton",
            state="FL",
            email=fake.email(),
            phone=fake.phone_number(),
            created_at=fake.date_time(),
            updated_at=fake.date_time(),
        )
        db.session.add(client)

    for i in range(15, 30):
        client = Client(
            user_id=user.id,
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            street=fake.street_address(),
            city="Deerfield",
            state="FL",
            email=fake.email(),
            phone=fake.phone_number(),
            created_at=fake.date_time(),
            updated_at=fake.date_time(),
        )
        db.session.add(client)

    for i in range(30, 45):
        client = Client(
            user_id=user.id,
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            street=fake.street_address(),
            city="Coral Springs",
            state="FL",
            email=fake.email(),
            phone=fake.phone_number(),
            created_at=fake.date_time(),
            updated_at=fake.date_time(),
        )
        db.session.add(client)

    for i in range(45, 51):
        client = Client(
            user_id=user.id,
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            street=fake.street_address(),
            city="Ft. Lauderdale",
            state="FL",
            email=fake.email(),
            phone=fake.phone_number(),
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
    db.session.execute(
        'TRUNCATE TABLE users, clients, pools, repairs, tasks, equipment CASCADE;')
    db.session.commit()
