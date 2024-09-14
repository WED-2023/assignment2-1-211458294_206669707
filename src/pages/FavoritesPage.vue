<template>
    <div>
      <RecipePreviewList title="Favorite Recipes" :recipes="favoriteRecipes" />
    </div>
  </template>
  
  <script>
  import RecipePreviewList from '../components/RecipePreviewList.vue';
  import { mockGetRecipesPreview } from '../services/recipes.js';
  import axios from 'axios'; 

  export default {
    name: 'FavoritesPage',
    components: {
      RecipePreviewList
    },
    data() {
    return {
      favoriteRecipes: []
    };
  },
  mounted() {
    this.fetchFavoriteRecipes();
    // EventBus.$on('favorites-updated', this.fetchFavoriteRecipes);
  },
  beforeDestroy() {
  // Clean up event listener
  // EventBus.$off('favorites-updated', this.fetchFavoriteRecipes);
},
  methods: {
    async fetchFavoriteRecipes() {
      // const allRecipes = mockGetRecipesPreview(4).data.recipes; // Adjust the number based on the total recipes available
      // const favoriteRecipes = allRecipes.filter(recipe => {
      //   const favoriteState = localStorage.getItem(`recipe_${recipe.id}_favorite`);
      //   return favoriteState === 'true';
      // });
      // this.favoriteRecipes = favoriteRecipes;
      const favoriteRecipeIds = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    this.favoriteRecipes = [];

    for (const recipeId of favoriteRecipeIds) {
      try {
        const response = await axios.get("http://localhost:3000/recipes/"+recipeId);
        this.favoriteRecipes.push(response.data);
      } catch (error) {
        console.error(`Error fetching recipe with ID ${recipeId}:`, error);
      }
    }
    }
  }
  };
  </script>
  
  <style scoped>
  </style>
  