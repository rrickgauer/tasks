"""
**********************************************************************************
Module: views

Url Prefix: /

This module handles the routing for all of the responses that return html (view).

**********************************************************************************
"""

import flask
from flask import Blueprint
from ..common import security

bp_views = Blueprint('bp_views', __name__)

#------------------------------------
# GET login page
#------------------------------------
@bp_views.route('/login')
def accountGet():
    security.clearSessionData()
    return flask.render_template('pages/login.html')