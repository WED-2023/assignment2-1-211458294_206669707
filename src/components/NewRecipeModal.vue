<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Add recipe</b-button>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="New Recipe"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      size="lg"
    >
      <NewRecipeForm ref="form"></NewRecipeForm>
    </b-modal>
  </div>
</template>

<script>
import NewRecipeForm from './NewRecipeForm.vue';

export default {
  components: {
    NewRecipeForm
  },
  methods: {
    resetModal() {
      this.$refs.form.resetForm();
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger form validation
      this.$refs.form.$v.$touch();
      if (this.$refs.form.isFormValid()) {
        alert('New Recipe was added. Bon Appetit!');
        // Form is valid, submit the form
        this.$refs.form.submitForm();
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing');
        });
      } else {
        // Display error message or handle invalid form
        alert('Form is not valid. Please check the fields and try again.');
      }
    }
  }
};
</script>
