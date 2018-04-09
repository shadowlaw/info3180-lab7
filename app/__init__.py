from flask import Flask

app = Flask(__name__)
app.config['SECRET_KEY'] = 'v\xf9\xf7\x11\x13\x18\xfaMYp\xed_\xe8\xc9w\x06\x8e\xf0f\xd2\xba\xfd\x8c\xda'

ALLOWED_IMAGES = set("jpg", "jpeg", "png")
UPLOAD_FOLDER = '/static/uploads'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ALLOWED_IMAGES'] = ALLOWED_IMAGES

app.config.from_object(__name__)
from app import views
