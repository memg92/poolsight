from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DateField
from wtforms.validators import DataRequired
from app.models import Client
from .states import states


class NewPoolForm(FlaskForm):
    user_id = IntegerField('user_id')
    client_id = IntegerField('client_id')
    street = StringField('street', validators=[
        DataRequired()])
    city = StringField('city', validators=[
        DataRequired()])
    state = SelectField('state', validators=[
        DataRequired()], choices=states)
    pool_size = IntegerField('pool_size', validators=[
        DataRequired()])
    property_type = SelectField('property_type', validators=[
        DataRequired()], choices=['Residential', 'Commercial'])
    monthly_rate = IntegerField('monthly_rate', validators=[
        DataRequired()])
    service_day = SelectField('service_day', validators=[
        DataRequired()], choices=['M', 'T', 'W', 'R', 'F'])
    filter_changed = DateField('filter_changed')
