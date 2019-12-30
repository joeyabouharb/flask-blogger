from server.models import DB, MA
from sqlalchemy import Column, Integer, String


class Post(DB.Model):
    __tablename__ = 'posts'
    post_id = Column(Integer, primary_key=True)
    title = Column(String)
    content = Column(String)


class PostSchema(MA.Schema):
    class Meta:
        fields = (
            'post_id',
            'content'
        )


post_schema = PostSchema()
posts_schema = PostSchema(many=True)
