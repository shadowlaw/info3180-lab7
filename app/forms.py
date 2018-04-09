from app import app
from flask_wtf import FlaskForm
from flask_wtf.file import FileFeid, FileRequired, FileAllowed
from wtforms import  StringField
from wtforms.fields import TextAreaField
from wtforms.validators import DataRequired

class UploadForm(FlaskForm):
    description = TextAreaField("Description", validators=[DataRequired()])
    photo = FileFeid("Photo", validators=[FileRequired(), FileAllowed(app.config['ALLOWED_IMAGES'], "Images Only!")])
