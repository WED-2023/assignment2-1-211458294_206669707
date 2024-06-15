<template>
  <div>
    <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="New Recipe"
        :visible="visible"
        @ok="handleOk"
      >
        
        <NewRecipeForm ref="form"></NewRecipeForm>
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
  methods: {
    resetModal() {
      this.$refs.form.resetForm();
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.$refs.form.submitForm();
    },
    handleFormError(errorMessage) {
      alert('Form is not valid: ' + errorMessage);
    },
    async handleFormSuccess(recipeDetails) {
      // this.$refs.modal.hide();
      try {
        const response = mockAddUserRecipe(recipeDetails);
        if (response.status === 200 && response.response.data.success) {
          alert(response.response.data.message);
          this.$bvModal.hide('modal-prevent-closing');
          this.$router.push('/');
        } else {
          alert('Failed to add the recipe. Please try again.');
        }
      } catch (error) {
        alert('An error occurred: ' + error.message);
      }
    }
  }
};
</script>
