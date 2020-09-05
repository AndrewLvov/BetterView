from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from flask_login import UserMixin

from backend.app import db


class Rating(db.Model):
    __tablename__ = 'rating'
    rater_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    rated_by_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    rater = relationship("User", foreign_keys=[rater_id], backref="given_ratings")
    rated_by = relationship("User", foreign_keys=[rated_by_id], backref="received_ratings")
    value = Column(Integer)


class User(UserMixin, db.Model):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    dou_id = Column(String)
    email = Column(String)





