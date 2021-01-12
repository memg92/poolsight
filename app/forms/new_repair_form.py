from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DateField
from wtforms.validators import DataRequired


class NewRepairForm(FlaskForm):
    poolId = IntegerField('pool_id')
    title = StringField('title', validators=[
        DataRequired()])
    description = StringField('description', validators=[
        DataRequired()])
