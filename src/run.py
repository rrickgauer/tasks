"""
This file is used to run the application using the built in flask development server.
This should not be used for production.

Another option to start the development server is to use the 'flask run' command line option:

$env:FLASK_APP = "tasks"
flask run --debugger --eager-loading --with-threads --host 0.0.0.0 --port 3000 --reload
"""

from tasks import app

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=4000, threaded=True)