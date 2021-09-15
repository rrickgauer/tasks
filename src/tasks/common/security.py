"""
**********************************************************************************
Module: security

Functions related to security and user authentication.

**********************************************************************************
"""
import flask

# keys for flask session values
SESSION_KEY_USER_ID       = 'user_id'
SESSION_KEY_USER_EMAIL    = 'user_email'
SESSION_KEY_USER_PASSWORD = 'user_password'

#------------------------------------
# Clear out all the flask session data
#------------------------------------
def clearSessionData():
    for key in [SESSION_KEY_USER_ID, SESSION_KEY_USER_EMAIL, SESSION_KEY_USER_PASSWORD]:
        flask.session.pop(key, None)

