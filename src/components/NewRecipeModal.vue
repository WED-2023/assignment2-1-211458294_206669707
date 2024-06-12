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
        this.$refs.form.resetForm()
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // if (form.name == '') {
        //   console.log('Form is not valid')
        // }
        // Check if all fields are empty or meet required conditions
        if (this.$refs.form.isFormEmpty() && this.$refs.form.isImageUploaded() && this.$refs.form.hasIngredients() && this.$refs.form.hasPreparationSteps()) {
          // Form is valid, submit the form
          this.$refs.form.submitForm()
          // Hide the modal manually
          this.$nextTick(() => {
            this.$bvModal.hide('modal-prevent-closing')
          })
        } else {
          // Display error message or handle invalid form
          console.log('Form is not valid')
        }
      }
    }
  };
  </script>
  