:: ----------------------------------------------------------------------------------
:: This batch file starts up the flask development server for the tasks project
:: ----------------------------------------------------------------------------------

:: CD to the src directory containing the application package
cd C:\xampp\htdocs\files\tasks\src

:: set the appropriate enviornment variable
SET FLASK_APP=tasks

:: start up the testing server
:: flask run --debugger --eager-loading --with-threads --host 0.0.0.0 --port 3000 --reload
flask run --debugger --with-threads --host 0.0.0.0 --port 4000 --reload

pause