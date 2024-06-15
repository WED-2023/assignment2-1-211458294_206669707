<template>
    <div>
      <h1>Favorite Recipes</h1>
      <RecipePreviewList :recipes="favoriteRecipes" />
    </div>
  </template>
  
  <script>
  import RecipePreviewList from '../components/RecipePreviewList.vue';
  
  export default {
    name: 'FavoritesPage',
    components: {
      RecipePreviewList
    },
  };
  </script>
  
  <style scoped>
  </style>
  