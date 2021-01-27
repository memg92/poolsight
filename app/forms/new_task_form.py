from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DateField, BooleanField
from wtforms.validators import DataRequired, NumberRange, InputRequired


class NewTaskForm(FlaskForm):
    repairId = IntegerField('repair_id')
    title = StringField('title', validators=[
        DataRequired()])
    rate = IntegerField('rate', validators=[
        InputRequired(), NumberRange(min=0, message="Rate charged cannot be negative")])
    cost = IntegerField('cost', validators=[
        InputRequired(), NumberRange(min=0, message="Cost cannot be negative")])
    description = StringField('description', validators=[
        DataRequired()])
    complete = BooleanField('complete')
