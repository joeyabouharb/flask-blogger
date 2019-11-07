"""
CLI commands for database migrations and seeding
export the file as a flask app and run flask with the following commands
"""
from server import create_app
from server.models import DB
from server.models.Post import Post


app = create_app()


# Command line tools
####################
@app.cli.command('create_db')
def create_db():
    DB.create_all()
    print('Database created, hmm')


@app.cli.command('drop_db')
def drop_db():
    DB.drop_all()
    print('Database dropped, man')


@app.cli.command('seed_db')
def seed_db():
    example_post = Post(
        title='I wanted a little freedom! ',
        content='but it got me nothing'
    )
    DB.session.add(example_post)
    print('seeded db!')
