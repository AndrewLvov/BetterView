import graphene
from graphene import relay, ObjectType, Schema, ClientIDMutation
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType
from flask_login import current_user

from backend.models import (
    User as UserModel,
    Rating as RatingModel)
from backend.app import db


class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (relay.Node, )


class Rating(SQLAlchemyObjectType):
    class Meta:
        model = RatingModel
        interfaces = (relay.Node, )


class CreateUpdateRating(ClientIDMutation):
    class Input:
        dou_id = graphene.String()
        name = graphene.String()
        rating = graphene.Int()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        rated_user = UserModel \
            .query \
            .filter(UserModel.dou_id == input['dou_id']) \
            .first()
        if not rated_user:
            rated_user = UserModel(name=input['name'], dou_id=input['dou_id'])
            db.session.add(rated_user)
            db.session.commit()
        rating = RatingModel \
            .query \
            .filter(RatingModel.rated == rated_user,
                    RatingModel.rater == current_user) \
            .first()
        if not rating:
            rating = RatingModel(rated=rated_user, rater=current_user)

        rating.value = input['rating']
        db.session.add(rating)
        db.session.commit()

        return CreateUpdateRating()


class Query(ObjectType):
    """
    example query:
    {
      allUsers(sort: [NAME_ASC, ID_ASC]) {
        edges {
          node {
            id
            name
            douId
          }
        }
      }
    }
    """
    node = relay.Node.Field()
    # Allow only single column sorting
    all_users = SQLAlchemyConnectionField(
        User.connection, sort=User.sort_argument())
    # Allows sorting over multiple columns, by default over the primary key
    all_ratings = SQLAlchemyConnectionField(Rating.connection)


class Mutation(ObjectType):
    """
    {
      mutation{
      createUpdateRating(input:{
          douId:"abcdef",
          name:"John Jack",
          rating:5
        }
      )
    }
    """
    create_update_rating = CreateUpdateRating.Field()


schema = Schema(query=Query, mutation=Mutation)
