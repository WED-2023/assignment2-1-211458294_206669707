<template>
    <div class="card mb-4">
      <img :src="recipe.image" class="card-img-top" alt="Recipe Image">
      <div class="card-body">
        <h5 class="card-title">{{ recipe.name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ recipe.owner.name }} ({{ recipe.owner.relation }})</h6>
        <p class="card-text"><strong>Occasion:</strong> {{ recipe.occasion }}</p>
        <h6>Ingredients:</h6>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">
            {{ ingredient.amount }} {{ ingredient.measure_unit }} {{ ingredient.name }}
          </li>
        </ul>
        <h6>Preparation Steps:</h6>
        <ol>
          <li v-for="(step, index) in recipe.preparation_steps" :key="index">
            {{ step }}
          </li>
        </ol>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RecipeCard',
    props: {
      recipe: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    max-width: 600px;
    margin: auto;
  }
  .card-img-top {
    height: 300px;
    object-fit: cover;
  }
  </style>
  