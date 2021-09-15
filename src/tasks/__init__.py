"""
**********************************************************************************

This is the main application file!!

It sets up all the flask application configuration settings, and intializes the 
flask application used throughout the code.

**********************************************************************************
"""

# third party libraries
from flask import Flask
from flask_cors import CORS

# blueprints
from . import routes

#----------------------------------------------------------
# Setup the flask app
# Add custom config options
#----------------------------------------------------------
def initApp(flaskApp: Flask):
    # setup the custom response json encoder
    # flaskApp.json_encoder = CustomEncoder              
    flaskApp.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

    # setup key for the session data
    flaskApp.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

    # setup the CORS policy
    CORS(flaskApp)   

#----------------------------------------------------------
# Registert all the blueprints
#----------------------------------------------------------
def registerBlueprints(flaskApp: Flask):
    flaskApp.register_blueprint(routes.views.bp_views, url_prefix='')
    flaskApp.register_blueprint(routes.api.bp_api, url_prefix='/api')


# call all the init functions
app = Flask(__name__)
initApp(app)
registerBlueprints(app)