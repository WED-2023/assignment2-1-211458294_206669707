<template>
    <div>
      <RecipePreviewList title= "My Recipes" :recipes="myrecipes" />
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
  