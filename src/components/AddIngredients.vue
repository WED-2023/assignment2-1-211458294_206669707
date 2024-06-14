<template>
  <div>
    <div v-for="(ingredient, index) in ingredients" :key="index">
      <IngredientItem 
        :ingredient="ingredient" 
        :index="index" 
        @remove="removeIngredient"
        @save="saveIngredient"
      />
    </div>
    <b-button @click="addIngredient">Add Ingredient</b-button>
    <div v-if="formError" class="text-danger mt-2">{{ formError }}</div>
  </div>
</template>

<script>
import IngredientItem from './IngredientItem.vue';

export default {
  components: {
    IngredientItem
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      ingredients: this.value,
      formError: '',
      newIngredientAdded: false
    };
  },
  methods: {
    addIngredient() {
      this.formError = ''; // Reset the error message
      if (this.validateIngredients(false)) { // Validate all ingredients before adding a new one
        this.ingredients.push({ name: '', amount: '', unit: null, consistency: '', image: '' });
        this.newIngredientAdded = true;
      }
    },
    removeIngredient(index) {
      if (this.ingredients.length <= 1) {
        this.formError = 'You must add at least one ingredient.';
      } else {
        this.ingredients.splice(index, 1);
        this.validateIngredients(false);
      }
    },
    saveIngredient({ index, ingredient }) {
      this.ingredients.splice(index, 1, ingredient);
      this.validateIngredients(false);
    },
    validateIngredients(skipLast = false) {
      this.formError = '';
      const len = skipLast ? this.ingredients.length - 1 : this.ingredients.length;
      if (len < 1) {
        this.formError = 'You must add at least one ingredient.';
        return false;
      }
      for (let i = 0; i < len; i++) {
        if (!this.ingredients[i].name || this.ingredients[i].name.length < 2) {
          this.formError = `Ingredient ${i + 1} has an invalid name.`;
          return false;
        }
        if (!this.ingredients[i].amount || isNaN(this.ingredients[i].amount)) {
          this.formError = `Ingredient ${i + 1} has an invalid amount.`;
          return false;
        }
        if (!this.ingredients[i].unit) {
          this.formError = `Ingredient ${i + 1} has an invalid unit.`;
          return false;
        }
      }
      return true;
    }
  },
  watch: {
    ingredients: {
      handler(newIngredients) {
        if (this.newIngredientAdded) {
          this.newIngredientAdded = false;
        } else {
          this.validateIngredients(false);
        }
        this.$emit('input', newIngredients);
      },
      deep: true
    },
    value: {
      handler(newValue) {
        this.ingredients = newValue;
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.text-danger {
  color: red;
}
</style>
