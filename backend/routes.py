from app import app, api

# Import and register your routes
from resources.recipe import CreateRecipe, GetRecipes, getAllRecipe, DeleteRecipe
from resources.user import UserRegister, UserLogin, UserDetailsResource, \
      UserPasswordUpdateResource, UserDeleteResource

api.add_resource(CreateRecipe, "/recipe")
api.add_resource(GetRecipes, "/recipes")
api.add_resource(getAllRecipe, "/all-recipes")
api.add_resource(DeleteRecipe, "/delete-recipe/<int:recipe_id>")

api.add_resource(UserLogin, "/login")
api.add_resource(UserRegister, "/register")
api.add_resource(UserDetailsResource, "/user-details/<int:user_id>")
api.add_resource(UserPasswordUpdateResource, "/update-password")
api.add_resource(UserDeleteResource, "/user-delete/<int:user_id>")



@app.route('/')
def get():
    return 'Welcome to my Recipe App'