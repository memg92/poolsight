from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired
from app.models import Client
from .states import states


class NewClientForm(FlaskForm):
    user_id = IntegerField('user_id')
    firstname = StringField('firstname', validators=[
        DataRequired()])
    lastname = StringField('lastname', validators=[
        DataRequired()])
    street = StringField('street', validators=[
        DataRequired()])
    city = StringField('city', validators=[
        DataRequired()])
    state = SelectField('state', validators=[
        DataRequired()], choices=states)
    email = StringField('email', validators=[DataRequired()])
    phone = StringField('phone', validators=[DataRequired()])
