from .db import db
from datetime import datetime


class Pool(db.Model):
    __tablename__ = 'pools'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey(
        "clients.id"),  nullable=False)
    street = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(5), nullable=False)
    pool_size = db.Column(db.Integer, nullable=False)
    property_type = db.Column(db.String, nullable=False, default="Residential")
    monthly_rate = db.Column(db.Integer, nullable=False)
    service_day = db.Column(db.String(1), nullable=False)
    filter_changed = db.Column(db.Date)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="pools")
    # client = db.relationship(
    #     "Client", back_populates="pools")
    repairs = db.relationship(
        "Repair", back_populates="pool", cascade="delete, delete-orphan", order_by="Repair.updated_at.desc()")
    equipment = db.relationship(
        "Equipment", back_populates="pool", cascade="delete, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "client_id": self.client_id,
            "street": self.street,
            "city": self.city,
            "state": self.state,
            "pool_size": self.pool_size,
            "property_type": self.property_type,
            "monthly_rate": self.monthly_rate,
            "service_day": self.service_day,
            "filter_changed": self.filter_changed,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def to_dict_client(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "client_id": self.client_id,
            "street": self.street,
            "city": self.city,
            "state": self.state,
            "pool_size": self.pool_size,
            "property_type": self.property_type,
            "monthly_rate": self.monthly_rate,
            "service_day": self.service_day,
            "filter_changed": self.filter_changed,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "client": self.client.to_dict(),
        }

    def to_dict_full(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "client_id": self.client_id,
            "street": self.street,
            "city": self.city,
            "state": self.state,
            "pool_size": self.pool_size,
            "property_type": self.property_type,
            "monthly_rate": self.monthly_rate,
            "service_day": self.service_day,
            "filter_changed": self.filter_changed,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "client": self.client.to_dict(),
            "repairs": [repair.to_dict_tasks() for repair in self.repairs],
        }
