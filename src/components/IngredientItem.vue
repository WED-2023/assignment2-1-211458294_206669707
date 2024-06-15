<template>
    <div class="ingredient-item">
      <b-form-row>
        <b-col>
          <b-form-input 
            v-model="$v.ingredient.name.$model" 
            placeholder="Ingredient Name" 
            :class="{'is-invalid': $v.ingredient.name.$error}"
          ></b-form-input>
          <b-form-invalid-feedback v-if="$v.ingredient.name.$error">
            Name must be at least 2 characters
          </b-form-invalid-feedback>
        </b-col>
        <b-col>
          <b-form-input 
            v-model="$v.ingredient.amount.$model" 
            placeholder="Amount" 
            type="text" 
            :class="{'is-invalid': $v.ingredient.amount.$error}"
          ></b-form-input>
          <b-form-invalid-feedback v-if="$v.ingredient.amount.$error">
            Amount must be digits only
          </b-form-invalid-feedback>
        </b-col>
        <b-col>
          <b-form-select 
            v-model="$v.ingredient.unit.$model" 
            :options="unitOptions" 
            placeholder="Unit"
            :class="{'is-invalid': $v.ingredient.unit.$error}"
          ></b-form-select>
          <b-form-invalid-feedback v-if="$v.ingredient.unit.$error">
            Unit is required
          </b-form-invalid-feedback>
        </b-col>
        <b-col>
          <b-form-input v-model="ingredient.consistency" placeholder="Consistency"></b-form-input>
        </b-col>
        <b-col>
          <b-form-file 
            @change="onFileChange" 
            accept="image/*"
            :class="{'is-invalid': fileError}"
          ></b-form-file>
          <b-form-invalid-feedback v-if="fileError">{{ fileError }}</b-form-invalid-feedback>
        </b-col>
        <b-col>
          <b-button variant="success" @click="saveIngredient">Save</b-button>
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
  import { required, minLength, numeric } from "vuelidate/lib/validators";
  import Vuelidate from "vuelidate";
  
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
        fileError: '',
        unitOptions: [
          { value: 'g', text: 'Grams' },
          { value: 'kg', text: 'Kilograms' },
          { value: 'ml', text: 'Milliliters' },
          { value: 'l', text: 'Liters' },
          { value: 'cup', text: 'Cup' },
          { value: 'tsp', text: 'Teaspoon' },
          { value: 'tbsp', text: 'Tablespoon' }
        ]
      };
    },
    validations: {
      ingredient: {
        name: {
          required,
          minLength: minLength(2)
        },
        amount: {
          required,
          numeric
        },
        unit: {
          required
        }
      }
    },
    methods: {
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
        } else {
          this.fileError = 'Please select an image file';
          this.$set(this.ingredient, 'image', '');
        }
      },
      saveIngredient() {
        this.$v.$touch();
        if (this.$v.$invalid || this.fileError) {
          return;
        }
        this.$emit('save', { index: this.index, ingredient: this.ingredient });
      },
      removeIngredient() {
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
  