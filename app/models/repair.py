from .db import db
from datetime import datetime


class Repair(db.Model):
    __tablename__ = 'repairs'

    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(
        db.Integer, db.ForeignKey("clients.id"), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    client = db.relationship(
        "Client", back_populates="repairs")
    tasks = db.relationship(
        "Task", back_populates="repair", cascade="delete, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "title": self.title,
            "description": self.description,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
