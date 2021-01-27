from app.models import db, Pool, User, Client
from faker import Faker
from random import randint


fake = Faker()
days = {
    0: "M",
    1: "T",
    2: "W",
    3: "R",
    4: "F",
}


def seed_pools():
    try:
        client = Client.query.first()
        user = User.query.first()
    except:
        user = {id: 1}

    for i in range(10):
        pool = Pool(
            user_id=user.id,
            client_id=i + client.id,
            street=fake.street_address(),
            city="Boca Raton",
            state="FL",
            pool_size=20,
            property_type="Residential",
            monthly_rate=80,
            service_day=days[randint(0, 4)],
            filter_cleaned=fake.date_between(
                start_date='-1y', end_date='today'),
            created_at=fake.date_time(),
            updated_at=fake.date_between(
                start_date='-1y', end_date='today'),
        )
        db.session.add(pool)

    for i in range(10, 20):
        pool = Pool(
            user_id=user.id,
            client_id=i + client.id,
            street=fake.street_address(),
            city="Deerfield",
            state="FL",
            pool_size=20,
            property_type="Commercial",
            monthly_rate=80,
            service_day=days[randint(0, 4)],
            filter_cleaned=fake.date_between(
                start_date='-1y', end_date='today'),
            created_at=fake.date_time(),
            updated_at=fake.date_between(
                start_date='-1y', end_date='today'),
        )
        db.session.add(pool)

    for i in range(20, 30):
        pool = Pool(
            user_id=user.id,
            client_id=i + client.id,
            street=fake.street_address(),
            city="Coral Springs",
            state="FL",
            pool_size=20,
            property_type="Residential",
            monthly_rate=80,
            service_day=days[randint(0, 4)],
            filter_cleaned=fake.date_between(
                start_date='-1y', end_date='today'),
            created_at=fake.date_time(),
            updated_at=fake.date_between(
                start_date='-1y', end_date='today'),
        )
        db.session.add(pool)

    for i in range(30, 40):
        pool = Pool(
            user_id=user.id,
            client_id=i + client.id,
            street=fake.street_address(),
            city="Ft. Lauderdale",
            state="FL",
            pool_size=40,
            property_type="Residential",
            monthly_rate=85,
            service_day=days[randint(0, 4)],
            filter_cleaned=fake.date_between(
                start_date='-1y', end_date='today'),
            created_at=fake.date_time(),
            updated_at=fake.date_between(
                start_date='-1y', end_date='today'),
        )
        db.session.add(pool)

    for i in range(40, 50):
        pool = Pool(
            user_id=user.id,
            client_id=i + client.id,
            street=fake.street_address(),
            city="Miami",
            state="FL",
            pool_size=30,
            property_type="Commercial",
            monthly_rate=75,
            service_day=days[randint(0, 4)],
            filter_cleaned=fake.date_between(
                start_date='-1y', end_date='today'),
            created_at=fake.date_time(),
            updated_at=fake.date_between(
                start_date='-1y', end_date='today'),
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
