from .db import db
from datetime import datetime


class Client(db.Model):
    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    fistname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    street = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(5), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone = db.Column(db.String(40), nullable=False)
    pool_size = db.Column(db.Integer, nullable=False)
    property_type = db.Column(db.String, nullable=False, default="Residential")
    monthly_rate = db.Column(db.Integer, nullable=False)
    service_day = db.Column(db.String(1), nullable=False)
    filter_changed = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="clients")
    repairs = db.relationship(
        "Repair", back_populates="client", cascade="delete, delete-orphan")
    equipment = db.relationship(
        "Equipment", back_populates="client", cascade="delete, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "fistname": self.fistname,
            "lastname": self.lastname,
            "street": self.street,
            "city": self.city,
            "state": self.state,
            "email": self.email,
            "phone": self.phone,
            "pool_size": self.pool_size,
            "property_type": self.property_type,
            "monthly_rate": self.monthly_rate,
            "service_day": self.service_day,
            "filter_changed": self.filter_changed,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
