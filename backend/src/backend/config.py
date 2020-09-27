class ConfigObject:
    SQLALCHEMY_DATABASE_URI = \
        'sqlite://db.sqlite3'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ALLOWED_ORIGINS =["http://127.0.0.1:5000/graphql","http://127.0.0.1:5000"]
