// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import family_recipes from "../assets/mocks/Family_Recipes.json"

export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  for(let i = 1; i <= amount/4; i++){
    recipes.push(recipe_preview[0]);
    recipes.push(recipe_preview[1]);
    recipes.push(recipe_preview[2]);
    recipes.push(recipe_preview[3]);
  }
  if(amount%4 !=0){
    recipes.push(recipe_preview[0]);
    if (amount%4 ==2){
      recipes.push(recipe_preview[1]);
    }
    if (amount%4 ==3){
      recipes.push(recipe_preview[1]);
      recipes.push(recipe_preview[2]);
    }
  }

  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails(recipeId) {
    // return { data: { recipe: recipe_full_view } } ;
    console.log(typeof(recipeId));
    //I CHANGED:
    if (recipeId == 716429){
      console.log("yes");
      console.log(recipe_full_view);
      return {status: 200, data: { recipe: recipe_full_view[0] } };
    }
    else if (recipeId == 638678){
      return {status: 200, data: { recipe: recipe_full_view[1] } };
    }
    else if(recipeId ==716431){
      return {status: 200, data: { recipe: recipe_full_view[2] } };
    }
    else if(recipeId == 731892){
      return {status: 200, data: { recipe: recipe_full_view[3] } };
    }
  }

export function mockGetRelevantRecipesForSearch(success = true){
  if (!success) {
    throw { status: 409, response: { data: { message: "No Results Found", success: false } } };
  }
  return { status: 200, response: { data: { message: "Result Found", success: true}} };
}

export function mockGetFamilyRecipes() {
  const recipesArray = Object.values(family_recipes);
  console.log("recipesArray: ", recipesArray);
  return { data: { recipes: recipesArray } };
}