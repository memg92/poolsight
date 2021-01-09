from .db import db
from datetime import datetime


class Client(db.Model):
    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    street = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(5), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="clients")
    pools = db.relationship(
        "Pool", cascade="delete, delete-orphan", uselist=False, lazy="joined", backref="client")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "street": self.street,
            "city": self.city,
            "state": self.state,
            "email": self.email,
            "phone": self.phone,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def to_dict_pool(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "street": self.street,
            "city": self.city,
            "state": self.state,
            "email": self.email,
            "phone": self.phone,
            "pool": self.pools.to_dict(),
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
