<template>
  <div>
    <div v-for="(step, index) in steps" :key="index">
      <b-form-group :label="'Step ' + (index + 1)">
        <b-form-textarea
          class="flex-grow-1 mr-2"
          v-model="step.description"
          @blur="handleBlur(index)"
          placeholder="Describe the step"
          rows="3"
          :state="step.touched ? (step.description !== '' ? true : false) : null"
        ></b-form-textarea>
        <b-form-invalid-feedback v-if="step.touched && !step.description">
          This field is required.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button
        variant="danger"
        @click="removeStep(index)"
        v-show="steps.length > 1"
        class="mb-2">-</b-button>
    </div>
    <b-button @click="addStep" :disabled="!allStepsFilled" variant="success">Add Step</b-button>
    <div v-if="formError" class="text-danger mt-2">{{ formError }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: [{ description: '', touched: false }],
      formError: ''
    };
  },
  computed: {
    allStepsFilled() {
      return this.steps.every(step => step.description.trim() !== '');
    }
  },
  methods: {
    addStep() {
      if (this.allStepsFilled) {
        this.steps.push({ description: '' });
        this.emitSteps();
      } else {
        this.formError = 'Please complete all previous steps before adding a new one.';
      }
    },
    removeStep(index) {
      if (this.steps.length > 1) {
        this.steps.splice(index, 1);
        this.emitSteps();
      } else {
        this.formError = 'At least one step is required.';
      }
    },
    handleBlur(index) {
      this.steps[index].touched = true;
      this.emitSteps();
    },
    emitSteps() {
      this.$emit('update-steps', this.steps);
    }
  }
}
</script>

<style scoped>
/* .text-danger {
  color: red;
} */
</style>
