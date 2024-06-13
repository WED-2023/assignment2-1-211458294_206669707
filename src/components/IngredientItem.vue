<template>
    <div class="ingredient-item">
      <b-form-row>
        <b-col>
          <b-form-input v-model="ingredient.name" placeholder="Ingredient Name"></b-form-input>
        </b-col>
        <b-col>
          <b-form-input v-model="ingredient.amount" placeholder="Amount" type="number"></b-form-input>
        </b-col>
        <b-col>
          <b-form-select v-model="ingredient.unit" :options="unitOptions"></b-form-select>
        </b-col>
        <b-col>
          <b-form-input v-model="ingredient.consistency" placeholder="Consistency"></b-form-input>
        </b-col>
        <b-col>
          <b-form-file @change="onFileChange" accept="image/*"></b-form-file>
          <b-form-invalid-feedback v-if="fileError">{{ fileError }}</b-form-invalid-feedback>
        </b-col>
        <b-col>
          <b-button variant="danger" @click="removeIngredient">Remove</b-button>
        </b-col>
      </b-form-row>
      <div v-if="ingredient.image" class="mt-2">
        <img :src="ingredient.image" alt="Ingredient Image" style="max-width: 100px; max-height: 100px;">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      ingredient: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        fileError: ''
      };
    },
    methods: {
      removeIngredient() {
        this.$emit('remove', this.index);
      },
      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          if (!file.type.startsWith('image/')) {
            this.fileError = 'Please select a valid image file';
            this.$set(this.ingredient, 'image', '');
            return;
          }
          if (file.size > 2 * 1024 * 1024) { // 2MB limit
            this.fileError = 'Image size should be less than 2MB';
            this.$set(this.ingredient, 'image', '');
            return;
          }
          this.fileError = '';
          const reader = new FileReader();
          reader.onload = (e) => {
            this.$set(this.ingredient, 'image', e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    },
    computed: {
      unitOptions() {
        return [
          { value: 'tbsp', text: 'Tbsp' },
          { value: 'tsp', text: 'Tsp' },
          { value: 'cups', text: 'Cups' },
          { value: 'grams', text: 'Grams' },
          { value: 'ml', text: 'Ml' },
          { value: 'oz', text: 'Oz' },
        ];
      }
    }
  }
  </script>
  
  <style scoped>
  .ingredient-item {
    margin-bottom: 1rem;
  }
  </style>
  