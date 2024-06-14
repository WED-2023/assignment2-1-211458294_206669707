<template>
    <div class="item">
      <b-form-row>
        <b-col>
          <b-form-input 
            v-model="$v.item.firstField.$model" 
            placeholder="Step title" 
            :class="{'is-invalid': $v.item.firstField.$error}"
          ></b-form-input>
          <b-form-invalid-feedback v-if="$v.item.firstField.$error">
            Step title is required
          </b-form-invalid-feedback>
        </b-col>
        <b-col>
          <b-form-input v-model="item.secondField" placeholder="Description"></b-form-input>
        </b-col>
        <b-col>
          <b-button variant="success" @click="saveItem">Save</b-button>
        </b-col>
        <b-col>
          <b-button variant="danger" @click="removeItem">Remove</b-button>
        </b-col>
      </b-form-row>
    </div>
  </template>
  
  <script>
  import { required } from "vuelidate/lib/validators";
  import Vuelidate from "vuelidate";
  
  export default {
    props: {
      item: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },
    validations: {
      item: {
        firstField: {
          required
        }
      }
    },
    methods: {
      saveItem() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }
        this.$emit('save', { index: this.index, item: this.item });
      },
      removeItem() {
        this.$emit('remove', this.index);
      }
    },
    mounted() {
      this.$v.$reset();
    }
  };
  </script>
  
  <style scoped>
  .is-invalid {
    border-color: red;
  }
  </style>
  