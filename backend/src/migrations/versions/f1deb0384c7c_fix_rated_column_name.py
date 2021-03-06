"""empty message

Revision ID: f1deb0384c7c
Revises: c27a804884a6
Create Date: 2020-09-06 18:48:35.565917

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f1deb0384c7c'
down_revision = 'c27a804884a6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('rating', sa.Column('rated_id', sa.Integer(), nullable=False))
    op.drop_constraint('rating_rated_by_id_fkey', 'rating', type_='foreignkey')
    op.create_foreign_key(None, 'rating', 'user', ['rated_id'], ['id'])
    op.drop_column('rating', 'rated_by_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('rating', sa.Column('rated_by_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'rating', type_='foreignkey')
    op.create_foreign_key('rating_rated_by_id_fkey', 'rating', 'user', ['rated_by_id'], ['id'])
    op.drop_column('rating', 'rated_id')
    # ### end Alembic commands ###
