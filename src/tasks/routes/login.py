"""
**********************************************************************************
Module: login

Url Prefix: /login


**********************************************************************************
"""

import flask
from flask import Blueprint

bp_login = Blueprint('bp_login', __name__)

#------------------------------------
# GET login page
#------------------------------------
@bp_login.route('')
def accountGet():
    return flask.render_template('login.html')