from server.models import DB, MA
from sqlalchemy import Column, Integer, String


class User(DB.Model):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    password = Column(String)
    email = Column(String, unique=True)


class UserSchema(MA.Schema):
    class Meta:
        fields = (
            'id',
            'name',
            'email',
            'password'
        )


user_schema = UserSchema()
users_schema = UserSchema(many=True)