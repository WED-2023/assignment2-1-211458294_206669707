<template>
  <!-- visible.sync and hidden -->
  <div>
    <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="New Recipe"
        :visible.sync="visible"
        @ok="handleOk"
        @hidden="handleHidden"
      >
    <!-- <NewRecipeForm ref="form"></NewRecipeForm> -->
    <NewRecipeForm ref="form" @form-error="handleFormError" @form-success="handleFormSuccess"></NewRecipeForm>
  </b-modal>
<!-- <b-button v-b-modal.modal-prevent-closing>Add Recipe</b-button> -->
<!-- <b-modal
  id="modal-prevent-closing"
  ref="modal"
  title="New Recipe"
  @ok="handleOk"
  @hidden="resetModal"
  @show="resetModal"
  size="lg"
>
  <NewRecipeForm ref="form" @form-error="handleFormError" @form-success="handleFormSuccess"></NewRecipeForm>
  <router-link ref="routerLink" :to="{ path: '/' }" class="d-none"></router-link>
</b-modal> -->
  </div>
</template>
<script>
import NewRecipeForm from './NewRecipeForm.vue';
import { mockAddUserRecipe } from '../services/user.js';
import { EventBus } from '@/main.js';

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  components: {
    NewRecipeForm
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.modal.show();
        });
      } else {
        this.$refs.modal.hide();
      }
    }
  },
  methods: {
    resetModal() {
      this.$refs.form.resetForm();
    },
    handleOk(bvModalEvent) {
      // bvModalEvent.preventDefault();
      this.$refs.form.submitForm();
    },
    handleHidden() {
      this.$emit('close');
    },
    handleFormError(errorMessage) {
      alert('Form is not valid: ' + errorMessage);
    },
    async handleFormSuccess(recipeDetails) {
      // this.$refs.modal.hide();
      // try {
      //   const response = await mockAddUserRecipe(recipeDetails);
      //   // const response =  mockAddUserRecipe(recipeDetails);
      //   if (response.status === 200 && response.response.data.success) {
      //     alert(response.response.data.message);
      //     // this.$bvModal.hide();
      //     this.$bvModal.hide('modal-prevent-closing');
      //     this.$router.push('/');
      //   } else {
      //     alert('Failed to add the recipe. Please try again.');
      //   }
      // } catch (error) {
      //   alert('An error occurred: ' + error.message);
      // }
      try {
        // Get the current recipes from localStorage
        const storedRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
        console.log("recipeDetails: ",recipeDetails);
        // Add the new recipe to the stored recipes
        const filteredRecipes = storedRecipes.filter(recipe => 
        recipe && Object.values(recipe).every(value => value !== null && value !== undefined)
      );

        // Add the new recipe to the filtered recipes
        filteredRecipes.push(recipeDetails);
        // storedRecipes.push(recipeDetails);

        // Save the updated recipe list to localStorage
        localStorage.setItem('myRecipes', JSON.stringify(filteredRecipes));
        console.log("filteredRecipes: ",JSON.parse(localStorage.getItem('myRecipes')))
        // Emit an event to update MyRecipesPage
        EventBus.$emit('recipe-added', recipeDetails);

        // Close the modal and navigate to the main page
        this.$bvModal.hide('modal-prevent-closing');
        this.$router.push('/');
        console.log("this is here");

        // if (this.$route.path !== '/') {
          // this.$router.push('/');
    // }
      } catch (error) {
        alert('An error occurred: ' + error.message);
      }
    }
  }
};
</script>