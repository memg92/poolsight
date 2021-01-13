from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DateField
from wtforms.validators import DataRequired, NumberRange


class NewTaskForm(FlaskForm):
    repairId = IntegerField('repair_id')
    title = StringField('title', validators=[
        DataRequired()])
    category = StringField('category', validators=[
        DataRequired()])
    rate = IntegerField('rate', validators=[
        DataRequired(), NumberRange(min=0, message="Rate charged cannot be negative")])
    cost = IntegerField('cost', validators=[
        DataRequired(), NumberRange(min=0, message="Cost cannot be negative")])
    description = StringField('description', validators=[
        DataRequired()])
