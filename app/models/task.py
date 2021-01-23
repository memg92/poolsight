from .db import db
from datetime import datetime


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    repair_id = db.Column(
        db.Integer, db.ForeignKey("repairs.id"), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    rate = db.Column(db.Integer, nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text)
    pending = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    repair = db.relationship(
        "Repair", back_populates="tasks")

    def to_dict(self):
        return {
            "id": self.id,
            "repair_id": self.repair_id,
            "title": self.title,
            "description": self.description,
            "rate": self.rate,
            "cost": self.cost,
            "pending": self.pending,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
