<template>
    <div>
      <b-form-group label="Name">
        <b-form-input v-model="name" placeholder="Recipe name"></b-form-input>
      </b-form-group>
      <b-form-group label="Vegetarian">
        <YesOrNoButton v-model="vegetarian"></YesOrNoButton>
      </b-form-group>
      <b-form-group label="Vegan">
        <YesOrNoButton v-model="vegan"></YesOrNoButton>
      </b-form-group>
      <b-form-group label="Gluten Free">
        <YesOrNoButton v-model="glutenFree"></YesOrNoButton>
      </b-form-group>
      <b-form-group label="Recipe Image">
        <b-form-file accept="image/*"></b-form-file>
          <UploadImage v-model="recipeImage"></UploadImage>
      </b-form-group>
      <b-form-group label="Number of Dishes">
        <b-form-input v-model="numberOfDishes" placeholder="How many dishes from this recipe?"></b-form-input>
        <!-- <SpinButton v-model="numberOfDishes"></SpinButton> -->
      </b-form-group>
      <b-form-group label="Prep Time (minutes)">
        <b-form-input v-model="prepTime" placeholder="Minutes"></b-form-input>
      </b-form-group>
      <b-form-group label="Ingredients">
        <AddItems v-model="ingredients"></AddItems>
      </b-form-group>
      <b-form-group label="Preparation Steps">
        <AddItems v-model="preparationSteps" itemFirstPlaceholder="Step" itemSeconedPlaceholder="Description"></AddItems>
      </b-form-group>
    </div>
</template>
  
<script>
import YesOrNoButton from './YesOrNoButton.vue';
import UploadImage from './UploadImage.vue'
import AddItems from './AddItems.vue'
  
  export default {
    components: {
        YesOrNoButton,
        UploadImage,
        AddItems
    },
  data() {
    return {
      name: '', 
      vegetarian: null,
      vegan: null,
      glutenFree: null,
      recipeImage: null,
      imageState: null,
      numberOfDishes: '',
      prepTime: '',
      ingredients: [],
      preparationSteps: []
    };
  }
};
</script>
  