### Backend

## Requirements
The project works on **Python 3.8+**

## Custom config
You should define a local configuration via **local_config.py**, ideally in the same dir as **config.py**

    from backend.config import ConfigObject as ConfigObjectBase


    class ConfigObject(ConfigObjectBase):
        SECRET_KEY = '<YOUR SECRET KEY HERE>'

## Google Auth

Create an OAUTH2 client ID at [Google API & Services](https://console.developers.google.com/apis/credentials)
Specify Authorized JavaScript origins and redirect URIs:
origins:
* http://127.0.0.1:5000
* http://localhost:5000

redirect URIs:
* http://127.0.0.1:5000/login/callback
* http://127.0.0.1:5000/login/google/authorized
* http://localhost:5000/login/callback
* http://localhost:5000/login/google/authorized

More detailed instructions at [flask-dance-google](https://github.com/singingwolfboy/flask-dance-google)

Use API values in your config file:

    class ConfigObject(...):
        ...
        GOOGLE_OAUTH_CLIENT_ID = "<SOME ID YOU'VE GOT>.apps.googleusercontent.com"
        GOOGLE_OAUTH_CLIENT_SECRET = "<YOUR GOOGLE SECRET KEY>"


## Database

1. Create a database (unless **sqlite3**), create a user, give permissions from user to alter database.
2. Update your config object also with database settings. For example for PostgreSQL it might be:
    ```SQLALCHEMY_DATABASE_URI = \
        'postgresql+psycopg2://betterview-user:qwertY12345@localhost/betterview-db'```
3. Migrate DB:
    ```./manage.py db upgrade```
    
    
## Run backend

    ./manage.py runserver