from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def username_exists(form, field):
    print("Checking if user exits", form.data)
    print(form.data)
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("This username is already registered.")


def email_exists(form, field):
    print("Checking if user exits", form.data)
    print(form.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("This email is already registered.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[
                           DataRequired(), username_exists])

    email = StringField('email', validators=[DataRequired(), email_exists])

    role = SelectField('role', validators=[DataRequired(
    )], choices=[('admin', 'Admin'), ('tech', 'Technician')])

    password = StringField('password', validators=[DataRequired(), Length(
        min=6, max=12, message=f'Password must be between {min} and {max} characters long')])
