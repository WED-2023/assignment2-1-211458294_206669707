<template>
  <div class="container recipe-page">
    <div v-if="recipe">
      <div class="recipe-header text-center">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="img-fluid rounded mb-3" alt="Recipe Image" />
      </div>
      <div v-if="recipe.summary">
      <h2>Summary</h2>
      <p>{{ recipe.summary }}</p>
    </div>
      <div class="recipe-body">
        <div class="row">
          <div class="col-md-6">
            <h4 class="mb-2">Details</h4>
            <div class="detail-icons mb-2">
              <b-icon icon="clock" variant="info"></b-icon>
              <span>Ready in {{ recipe.readyInMinutes }} minutes</span>
            </div>
            <div class="detail-icons mb-2">
              <b-icon icon="heart-fill" variant="danger"></b-icon>
              <span>Likes: {{ recipe.aggregateLikes }}</span>
            </div>
            <div class="detail-icons mb-2">
              <b-icon icon="people-fill" variant="primary"></b-icon>
              <span>Servings: {{ recipe.servings }}</span>
            </div>
            <div class="diet-labels">
              <div :class="recipe.vegetarian ? 'badge bg-light-green' : 'badge bg-light-pink'">
                <b-icon icon="leaf" :variant="recipe.vegetarian ? 'success' : 'danger'"></b-icon>
                {{ recipe.vegetarian ? 'Vegetarian' : 'Non-Vegetarian' }}
              </div>
              <div :class="recipe.vegan ? 'badge bg-light-green' : 'badge bg-light-pink'">
                <b-icon icon="seedling" :variant="recipe.vegan ? 'success' : 'danger'"></b-icon>
                {{ recipe.vegan ? 'Vegan' : 'Non-Vegan' }}
              </div>
              <div :class="recipe.glutenFree ? 'badge bg-light-green' : 'badge bg-light-pink'">
                <b-icon icon="wheat" :variant="recipe.glutenFree ? 'success' : 'danger'"></b-icon>
                {{ recipe.glutenFree ? 'Gluten-Free' : 'Contains Gluten' }}
              </div>
            </div>
            <h4 class="mt-3">Ingredients</h4>
            <ul>
              <li v-for="(ingredient, index) in recipe.extendedIngredients" :key="index">
                {{ ingredient.original }}
                <b-button variant="outline-info" @click="toggleDetail(index)">
                  <b-icon icon="plus-circle-fill"></b-icon>
                </b-button>
                <b-collapse :id="'collapse-' + index" v-model="ingredientDetails[index]">
                  <div class="card card-body mt-2 ingredient-details">
                    <img :src="'https://spoonacular.com/cdn/ingredients_100x100/' + ingredient.image" alt="Ingredient image" class="img-thumbnail">
                    <p><strong>Aisle:</strong> {{ ingredient.aisle }}</p>
                    <p><strong>Consistency:</strong> {{ ingredient.consistency }}</p>
                  </div>
                </b-collapse>
              </li>
            </ul>
          </div>
          <div class="col-md-6">
            <h4>Instructions</h4>
            <ol>
              <li v-for="(step, index) in recipe._instructions" :key="index">
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mockGetRecipeFullDetails } from "../services/recipes.js";
import { BButton, BIcon, BCollapse } from 'bootstrap-vue';
import axios from 'axios'; 

export default {
  components: {
    BButton,
    BIcon,
    BCollapse
  },
  data() {
    return {
      recipe: null,
      ingredientDetails: []
    };
  },
  methods: {
    saveToRecentlyViewed() {
    const recentRecipes = JSON.parse(localStorage.getItem('recentRecipes')) || [];

    // Check if the current recipe already exists in the list
    const existingIndex = recentRecipes.findIndex(r => r.id === this.recipe.id);
    if (existingIndex !== -1) {
      // If it exists, remove it first
      recentRecipes.splice(existingIndex, 1);
    }

    // Add the current recipe to the front of the array
    recentRecipes.unshift({
      id: this.recipe.id,
      title: this.recipe.title,
      image: this.recipe.image
    });

    // Keep only the last 3 recipes
    const maxRecipes = 3;
    localStorage.setItem('recentRecipes', JSON.stringify(recentRecipes.slice(0, maxRecipes)));
  },
    toggleDetail(index) {
      // Ensure that the state is toggled correctly
      this.$set(this.ingredientDetails, index, !this.ingredientDetails[index]);
    }
  },
  async created() {
    const recipeId = this.$route.params.recipeId;
    console.log("this.$route.params.recipeId: ",this.$route.params.recipeId);
    const storedRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    // Check if a recipe with the same ID already exists
    const existingRecipe = storedRecipes.find(recipe => recipe && recipe.id === recipeId);
    if (existingRecipe) {
      console.log("Recipe with the same ID already exists:", existingRecipe);
      this.recipe = existingRecipe;
      console.log("this.recipe: ",this.recipe);
      this.recipe._instructions = this.recipe.preparationSteps.map(step => step.description);
      this.ingredientDetails = this.recipe.ingredients.map(ing => ing.name);
      this.saveToRecentlyViewed();
      return;
    }
    try {
      // let response = mockGetRecipeFullDetails(recipeId);
      const response = await axios.get("http://localhost:3000/recipes/information/"+recipeId);
      console.log("here");
      if (response.status !== 200) {
          console.log("fuck");
          this.$router.replace("/NotFound");
          return;
      }
      this.recipe = response.data;
      console.log("this.recipe: ",this.recipe);
      this.recipe._instructions = this.recipe.analyzedInstructions[0].steps.map(s => s.step);
      this.ingredientDetails = this.recipe.extendedIngredients;
      console.log("this.ingredientDetails: ",this.ingredientDetails);
      this.saveToRecentlyViewed();
      // this.recipe = response.data.recipe;
      // this.recipe._instructions = response.data.recipe.analyzedInstructions.length ? response.data.recipe.analyzedInstructions[0].steps.map(s => s.step) : [response.data.recipe.instructions];
      // this.ingredientDetails = Array(this.recipe.extendedIngredients.length).fill(false);
    } catch (error) {
      console.error("Error loading recipe:", error);
      this.$router.replace("/NotFound");
    }
  }
};
</script>

<style scoped>
.recipe-page {
  background-color: #f8f9fa; /* Light grey background */
  color: #515151; /* Dark grey text */
}
.detail-icons {
  display: flex;
  align-items: center;
  gap: 10px;
}
.diet-labels div {
  display: block;
  margin-bottom: 5px;
}
.badge {
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.bg-light-green {
  background-color: #e2f0cb; /* Light green background */
}
.bg-light-pink {
  background-color: #f8d7da; /* Light pink background */
}
.ingredient-details {
  background-color: #e4e9dc; /* Light green background for details */
}
.img-thumbnail {
  width: 60px;  /* Adjust the width as needed */
  height: 60px; /* Adjust the height to maintain aspect ratio */
  object-fit: cover; /* Ensures the image covers the defined area without stretching */
}
</style>
