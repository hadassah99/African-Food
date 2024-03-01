from app import ma
from model import User, Recipe

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_only = ("password",)
        dump_only = ("id",)
        load_instance = True


class RecipeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Recipe
        dump_only = ("id",)
        include_fk = True
        load_instance = True