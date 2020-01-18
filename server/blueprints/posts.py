from math import ceil
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from server.models import DB
from server.models.Post import Post, posts_schema, post_schema


POSTS_BLUEPRINT = Blueprint('Posts', __name__, url_prefix='/api/v1/posts')


@POSTS_BLUEPRINT.route('/', methods=['GET'])
def display_blog_posts():
    page = int(request.args.get('page', '1'))
    start = (page - 1) * 6
    end = page * 6
    blog = Post.query.all()
    result = posts_schema.dump(blog)
    pages =  ceil(len(result) / 6)
    print(pages)
    page = result[start:end]
    return jsonify(
        {
            "result": page,
            "pageNo": pages
        }
    )


@POSTS_BLUEPRINT.route('/<int:post_id>', methods=['GET'])
def display_single_post(post_id: int):
    post = Post.query.filter_by(post_id=post_id).first()
    if post:
        result = post_schema.dump(post)
        return jsonify(result)
    else:
        return jsonify(message="Post does not exist"), 404


@POSTS_BLUEPRINT.route('/', methods=['POST'])
@jwt_required
def make_new_blog_post():
    """Accepts form data and creates new database record in blog-post table

    Use Bearer Token in the Postman Authorization tab, take the
    access token returned from '/login' route and inject.

    JWT is currently broken after ROUTE changes---------fix later
    Requires:
        JWT authorization
    """
    content = request.json.get('content', '').replace('\n', '')
    if not content:
        return jsonify(message="no content created"), 400
    new_post = Post(content=content)
    DB.session.add(new_post)
    DB.session.commit()
    return jsonify(message="New blog post created"), 201


@POSTS_BLUEPRINT.route('/', methods=['PUT'])
def update_post():
    post_id = int(request.json['post_id'])
    post = Post.query.filter_by(post_id=post_id).first()
    if post:
        post.title = request.json['title']
        post.content = request.json['content']
        DB.session.commit()
        return jsonify(message="Post updated!"), 202
    else:
        return jsonify(message="No post with that ID"), 404


@POSTS_BLUEPRINT.route('/<int:post_id>', methods=['DELETE'])
def delete_post(post_id: int):
    """Delete the record from database posts table

    Just enter the blog-post number into Postman with a DELETE request:
        ./delete-post/66

    Arguments:
        post_id: int: takes the argument from the URL

    Returns:
        message and status code in JSON
    """
    post = Post.query.filter_by(post_id=post_id).first()
    if post:
        DB.session.delete(post)
        DB.session.commit()
        return jsonify(message="You obliterated that post"), 202
    else:
        return jsonify(message="No post by that ID"), 404
