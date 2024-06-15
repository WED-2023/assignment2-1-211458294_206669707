<template>
    <div>
      <h1>My Recipes</h1>
      <RecipePreviewList :recipes="myrecipes" />
    </div>
  </template>
  
  <script>
  import RecipePreviewList from '../components/RecipePreviewList.vue';
  
  export default {
    name: 'MyRecipes',
    components: {
      RecipePreviewList
    },
  };
  </script>
  
  <style scoped>
  </style>
  