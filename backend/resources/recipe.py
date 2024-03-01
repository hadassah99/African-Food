from flask import request
from flask_restful import Resource
from flask_jwt_extended import(
    get_jwt,
    get_jwt_identity,
    jwt_required
)

from model import Recipe
from schema import RecipeSchema

recipe_schema = RecipeSchema()
recipes_schema = RecipeSchema(many=True)

class CreateRecipe(Resource):
    @classmethod
    def post(cls):
        recipe = recipe_schema.load(request.get_json())
       
        try:
            recipe.save_to_db()
        except Exception as e:
            print(e)
            return {"message": "An error occured while saving to the database"}, 500
        
        return {"message": "Recipe created Successfully"}, 201
    

class GetRecipes(Resource):
    @classmethod
    def get(cls):
        recipes = Recipe.query.all()

        results = recipes_schema.dump(recipes)
        return {"recipes": results}, 200

        
class getAllRecipe(Resource):
    def get(cls):
        recipes = Recipe.query.all()
        return recipes_schema.dump(recipes), 200
    
class DeleteRecipe(Resource):
    def delete(cls, recipe_id: int):
        recipe = Recipe.find_by_id(recipe_id)

        if not recipe:
            return {"message": "Recipe not found"}
        recipe.delete_from_db()
        return {'message': 'Recipe deleted successfully'}