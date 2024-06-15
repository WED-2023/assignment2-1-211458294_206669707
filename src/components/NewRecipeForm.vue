<template>
  <div>
    <b-form-group label="Name">
      <b-form-input 
        v-model="$v.name.$model" 
        placeholder="Recipe name" 
        :state="!$v.name.$error && $v.name.$touched"
      ></b-form-input>
      <b-form-invalid-feedback v-if="$v.name.$error && $v.name.$touched">
        Name must be at least 2 characters long.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Summary">
      <b-form-input 
        v-model="$v.summary.$model" 
        placeholder="Recipe summary" 
        :state="!$v.summary.$error && $v.summary.$touched"
      ></b-form-input>
      <b-form-invalid-feedback v-if="$v.summary.$error && $v.summary.$touched">
        Summary must be at least 2 characters long.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <template v-slot:label>
        Vegetarian <span class="text-danger">*</span>
      </template>
      <YesOrNoButton 
        v-model="$v.vegetarian.$model"
        :state="!$v.vegetarian.$error && $v.vegetarian.$touched"
      ></YesOrNoButton>
      <b-form-invalid-feedback v-if="$v.vegetarian.$error && $v.vegetarian.$touched">
        Vegetarian selection is required.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <template v-slot:label>
        Vegan <span class="text-danger">*</span>
      </template>
      <YesOrNoButton 
        v-model="$v.vegan.$model"
        :state="!$v.vegan.$error && $v.vegan.$touched"
      ></YesOrNoButton>
      <b-form-invalid-feedback v-if="$v.vegan.$error && $v.vegan.$touched">
        Vegan selection is required.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <template v-slot:label>
        Gluten Free <span class="text-danger">*</span>
      </template>
      <YesOrNoButton 
        v-model="$v.glutenFree.$model"
        :state="!$v.glutenFree.$error && $v.glutenFree.$touched"
      ></YesOrNoButton>
      <b-form-invalid-feedback v-if="$v.glutenFree.$error && $v.glutenFree.$touched">
        Gluten free selection is required.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Recipe Image">
      <UploadImage v-model="recipeImage"></UploadImage>
    </b-form-group>

    <b-form-group label="Number of Dishes">
      <b-form-input 
        v-model="$v.numberOfDishes.$model" 
        placeholder="How many dishes from this recipe?" 
        :state="!$v.numberOfDishes.$error && $v.numberOfDishes.$touched"
      ></b-form-input>
      <b-form-invalid-feedback v-if="$v.numberOfDishes.$error && $v.numberOfDishes.$touched">
        Number of dishes is required and must be a number.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Prep Time (minutes)">
      <b-form-input 
        v-model="$v.prepTime.$model" 
        placeholder="Minutes" 
        :state="!$v.prepTime.$error && $v.prepTime.$touched"
      ></b-form-input>
      <b-form-invalid-feedback v-if="$v.prepTime.$error && $v.prepTime.$touched">
        Prep time is required and must be a number.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Ingredients">
      <AddIngredients 
        v-model="$v.ingredients.$model"
        :state="!$v.ingredients.$error && $v.ingredients.$touched"
      ></AddIngredients>
      <b-form-invalid-feedback v-if="$v.ingredients.$error">
        Please add at least one ingredient with valid details.
      </b-form-invalid-feedback>
      <b-form-invalid-feedback v-if="$v.ingredients.$each.$error && $v.ingredients.$each.$touched">
        <div v-if="$v.ingredients.$each.name.$error">Ingredient name is required.</div>
        <div v-if="$v.ingredients.$each.amount.$error">Ingredient amount is required and must be a number.</div>
        <div v-if="$v.ingredients.$each.unit.$error">Ingredient unit is required.</div>
      </b-form-invalid-feedback>
    </b-form-group>
    <add-items v-model="preparationSteps"  @update-steps="updatePreparationSteps"></add-items>
    <!-- <b-form-group label="Preparation Steps">
      <AddItems 
        v-model="$v.preparationSteps.$model"
        itemFirstPlaceholder="Step" 
        itemSeconedPlaceholder="Description"
        :state="!$v.preparationSteps.$error && $v.preparationSteps.$touched"
      ></AddItems>
      <b-form-invalid-feedback v-if="$v.preparationSteps.$error">
        Please add at least one preparation step.
      </b-form-invalid-feedback>
      <b-form-invalid-feedback v-if="$v.preparationSteps.$each.$error && $v.preparationSteps.$each.$touched">
        <div v-if="$v.preparationSteps.$each.step.$error">Preparation step is required.</div>
      </b-form-invalid-feedback>
    </b-form-group> -->
  </div>
</template>

<script>
import { required, minLength, numeric } from 'vuelidate/lib/validators';
import YesOrNoButton from './YesOrNoButton.vue';
import UploadImage from './UploadImage.vue';
import AddItems from './AddItems.vue';
import AddIngredients from './AddIngredients.vue';

export default {
  components: {
    YesOrNoButton,
    UploadImage,
    AddItems,
    AddIngredients
  },
  data() {
    return {
      name: '', 
      summary: '',
      vegetarian: null,
      vegan: null,
      glutenFree: null,
      recipeImage: null,
      numberOfDishes: '',
      prepTime: '',
      ingredients: [{ name: '', amount: '', unit: '', consistency: '', image: '' }],
      // preparationSteps: [{ step: '', description: '' }]
      preparationSteps: [{ description: '' }]
    };
  },
  validations: {
    name: { required, minLength: minLength(2) },
    summary: { required, minLength: minLength(2) },
    vegetarian: { required },
    vegan: { required },
    glutenFree: { required },
    numberOfDishes: { required, numeric },
    prepTime: { required, numeric },
    ingredients: {
      $each: {
        name: { required },
        amount: { required, numeric },
        unit: { required }
      }
    },
    preparationSteps: {
      $each: {
        description: { required }
      }
    }
  },
  methods: {
    updatePreparationSteps(steps) {
      this.preparationSteps = steps;
    },
    resetForm() {
      this.$v.$reset();
      this.name = '';
      this.summary = '';
      this.vegetarian = null;
      this.vegan = null
      this.glutenFree = null;
      this.recipeImage = null;
      this.numberOfDishes = '';
      this.prepTime = '';
      this.ingredients = [{ name: '', amount: '', unit: '', consistency: '', image: '' }];
      this.preparationSteps = [{ step: '', description: '' }];
    },
    isFormValid() {
      this.$v.$touch();
      return !this.$v.$invalid;
      // return !this.$v.$error;
    },
    submitForm() {
  this.$v.$touch();
  if (this.$v.$invalid) {
    let errorMessage = [];
    if (this.$v.name.$invalid) errorMessage.push('Name is invalid.');
    if (this.$v.summary.$invalid) errorMessage.push('Summary is invalid.');
    if (this.$v.vegetarian.$invalid) errorMessage.push('Vegetarian field is required.');
    if (this.$v.vegan.$invalid) errorMessage.push('Vegan field is required.');
    if (this.$v.glutenFree.$invalid) errorMessage.push('Gluten Free field is required.');
    if (this.$v.ingredients.$each.$anyError) errorMessage.push('One or more ingredients are incomplete.');
    if (this.$v.preparationSteps.$each.$anyError) errorMessage.push('One or more preparation steps are incomplete.');

    this.$emit('form-error', errorMessage.join(' '));
    this.formError = 'Please fix the errors in the form: ' + errorMessage.join(' ');
  } else {
    this.$emit('form-success');
    // alert('Form submitted successfully!');
    // Additional success actions here
  }
}


  }
};
</script>
