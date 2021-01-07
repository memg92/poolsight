from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


class NewClientForm(FlaskForm):
    fistname = StringField('fistname', validators=[
                           DataRequired()])
    lastname = StringField('lastname', validators=[
                           DataRequired()])
    street = StringField('street', validators=[
        DataRequired()])
    city = StringField('city', validators=[
        DataRequired()])
    state = StringField('state', validators=[
        DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    phone = StringField('phone', validators=[DataRequired()])
