from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DateField
from wtforms.validators import DataRequired
from .states import states


class NewPoolForm(FlaskForm):
    user_id = IntegerField('user_id')
    clientId = IntegerField('client_id')
    street = StringField('street', validators=[
        DataRequired()])
    city = StringField('city', validators=[
        DataRequired()])
    state = SelectField('state', validators=[
        DataRequired()], choices=states)
    poolSize = IntegerField('pool_size', validators=[
        DataRequired()])
    propertyType = SelectField('property_type', validators=[
        DataRequired()], choices=['Residential', 'Commercial'])
    monthlyRate = IntegerField('monthly_rate', validators=[
        DataRequired()])
    serviceDay = SelectField('service_day', validators=[
        DataRequired()], choices=['M', 'T', 'W', 'R', 'F'])
    filterCleaned = DateField('filter_cleaned')
