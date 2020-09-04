import graphene
from graphene import relay, ObjectType, Schema, ClientIDMutation
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType

from backend.models import (
    User as UserModel,
    Rating as RatingModel)


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
        dou_id = graphene.Int()
        # name = graphene.String()
        rating = graphene.Int()

    @classmethod
    def mutate_and_get_payload(cls, args, request, info):
        session = request.get("session")
        user = session.query(User).get(dou_id=info['dou_id'])
        user.rating
        return user


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


schema = Schema(query=Query)
