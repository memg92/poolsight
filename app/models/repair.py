from .db import db
from datetime import datetime


class Repair(db.Model):
    __tablename__ = 'repairs'

    id = db.Column(db.Integer, primary_key=True)
    pool_id = db.Column(
        db.Integer, db.ForeignKey("pools.id"), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    pool = db.relationship(
        "Pool", back_populates="repairs")
    tasks = db.relationship(
        "Task", back_populates="repair", cascade="delete, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "pool_id": self.pool_id,
            "title": self.title,
            "description": self.description,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def to_dict_tasks(self):
        return {
            "id": self.id,
            "pool_id": self.pool_id,
            "tasks": [task.to_dict() for task in self.tasks],
            "title": self.title,
            "description": self.description,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
