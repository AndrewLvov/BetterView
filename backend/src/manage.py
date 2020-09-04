#!/usr/bin/env python


from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from backend.app import flask_app, init_app, db

migrate = Migrate(flask_app, db)
# migrate = Migrate(flask_app)
manager = Manager(flask_app)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    init_app(flask_app)
    manager.run()
