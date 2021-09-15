"""
**********************************************************************************

This module contains functions for sending HTTP requests to the api.

**********************************************************************************
"""
from __future__ import annotations
import requests
import json

# urls for the api
URL_API = 'http://api.tasks.ryanrickgauer.com'
URL_API_ACCOUNT = F'{URL_API}/account'


#------------------------------------
# Send a GET /account request to the api
#------------------------------------
def getAccount(email, password) -> requests.Response:
    return requests.get(URL_API_ACCOUNT, auth=(email, password))

