from .db import db
from datetime import datetime


class Equipment(db.Model):
    __tablename__ = 'equipment'

    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(
        db.Integer, db.ForeignKey("clients.id"), nullable=False)
    equipment_type = db.Column(db.String(100), nullable=False, default="Other")
    brand = db.Column(db.String(100), nullable=False, default="Other")
    model = db.Column(db.String(100), nullable=False, default="Other")
    size = db.Column(db.Integer)
    horse_power = db.Column(db.Integer)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    client = db.relationship(
        "Client", back_populates="equipment")

    def to_dict(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "equipment_type": self.equipment_type,
            "brand": self.brand,
            "model": self.model,
            "size": self.size,
            "horse_power": self.horse_power,
            "description": self.description,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
