<template>
  <div class="container">
    <h1 class="my-4">Family Recipes</h1>
    <div class="row">
      <div class="col-md-6" v-for="recipe in recipes" :key="recipe.name">
        <RecipeCard :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCard from '../components/FamilyRecipeCard.vue';
import { mockGetFamilyRecipes } from '../services/recipes.js';

export default {
  name: 'FamilyRecipePage',
  components: {
    RecipeCard
  },
  data() {
    return {
      recipes: []
    };
  },
  created() {
    this.fetchRecipes();
  },
  methods: {
    fetchRecipes() {
      const response = mockGetFamilyRecipes();
      this.recipes = response.data.recipes;
    }
  }
};
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
