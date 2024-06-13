<template>
    <div>
      <div>
        <b-button-group>
          <b-button 
            :variant="yesSelected ? 'success' : 'outline-success'" 
            @click="selectYes">Yes</b-button>
          <b-button 
            :variant="noSelected ? 'danger' : 'outline-danger'" 
            @click="selectNo">No</b-button>
        </b-button-group>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: null,
      }
    },
    data() {
      return {
        yesSelected: this.value === true,
        noSelected: this.value === false
      };
    },
    watch: {
      value(newValue) {
        this.yesSelected = newValue === true;
        this.noSelected = newValue === false;
      }
    },
    methods: {
      selectYes() {
        this.yesSelected = true;
        this.noSelected = false;
        this.$emit('input', true);
      },
      selectNo() {
        this.yesSelected = false;
        this.noSelected = true;
        this.$emit('input', false);
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>
  