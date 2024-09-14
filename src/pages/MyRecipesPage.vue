<template>
    <div>
      <RecipePreviewList title= "My Recipes" :recipes="myrecipes" />
    </div>
  </template>
  
  <script>
  import RecipePreviewList from '../components/RecipePreviewList.vue';
  import { EventBus } from '@/main.js';

  export default {
    name: 'MyRecipes',
    components: {
      RecipePreviewList
    },
    data() {
    return {
      myrecipes: [] // Will hold the recipes from localStorage
    };
  },
  created() {
    // Fetch the recipes from localStorage on component creation
    this.fetchMyRecipes();

    // Listen for the 'recipe-added' event and refetch recipes
    EventBus.$on('recipe-added', this.fetchMyRecipes);
  },
  methods: {
    fetchMyRecipes() {
      // Get the recipes from localStorage
      const storedRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
      console.log("fetchMyRecipes: ", storedRecipes);
      this.myrecipes = storedRecipes;
    }
  },
  beforeDestroy() {
    // Clean up the event listener
    EventBus.$off('recipe-added', this.fetchMyRecipes);
  }
  };
  </script>
  
  <style scoped>
  </style>
  