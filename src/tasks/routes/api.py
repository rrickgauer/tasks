"""
**********************************************************************************
Module: api

Url Prefix: /api

Handles all the routing for the front-end /api requests.

**********************************************************************************
"""

import flask
from flask import Blueprint, request
from ..common import api, security

bp_api = Blueprint('bp_api', __name__)

#------------------------------------
# GET login page
#------------------------------------
@bp_api.route('/login')
def accountGet():
    # get the authentication credentials from the request
    email = request.authorization.get('username')
    password = request.authorization.get('password')

    # send an account request to the api
    response = api.getAccount(email, password)

    # return bad response if login attempt was not succesful
    if not response.ok:
        return flask.make_response(403)

    accountData = response.json()

    # set the session values
    flask.session[security.SESSION_KEY_USER_ID] = accountData.get('id')
    flask.session[security.SESSION_KEY_USER_EMAIL] = email
    flask.session[security.SESSION_KEY_USER_PASSWORD] = password
