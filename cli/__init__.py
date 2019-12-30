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
        content='<h2 class="title is-1"> this is an example post! </h2><p> Pariatur non culpa magna sint exercitation et dolor amet reprehenderit ad. Reprehenderit tempor sint eiusmod esse pariatur. Sunt elit irure proident commodo est eu officia aliqua exercitation aute. Qui dolor do laborum officia ex sit nisi excepteur aliqua et tempor. </p><p> Consectetur laborum voluptate deserunt est ut nulla qui. Exercitation laboris fugiat deserunt non ea. Duis ea cupidatat minim et. Ut sint ipsum labore do laborum deserunt sint dolor sit ad. Ut fugiat aute esse deserunt laborum labore ea. Dolor ad fugiat culpa ad velit irure anim voluptate consequat sit laborum magna magna. </p'
    )
    DB.session.add(example_post)
    DB.session.commit()
    print('seeded db!')
