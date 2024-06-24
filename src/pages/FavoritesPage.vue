<template>
    <div>
      <RecipePreviewList title="Favorite Recipes" :recipes="favoriteRecipes" />
    </div>
  </template>
  
  <script>
  import RecipePreviewList from '../components/RecipePreviewList.vue';
  import { mockGetRecipesPreview } from '../services/recipes.js';

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
  },
  methods: {
    fetchFavoriteRecipes() {
      const allRecipes = mockGetRecipesPreview(4).data.recipes; // Adjust the number based on the total recipes available
      const favoriteRecipes = allRecipes.filter(recipe => {
        const favoriteState = localStorage.getItem(`recipe_${recipe.id}_favorite`);
        return favoriteState === 'true';
      });
      this.favoriteRecipes = favoriteRecipes;
    }
  }
  };
  </script>
  
  <style scoped>
  </style>
  