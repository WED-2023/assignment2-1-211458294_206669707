<template>
  <div>
    <div v-for="(ingredient, index) in ingredients" :key="index">
      <IngredientItem 
        :ingredient="ingredient" 
        :index="index" 
        @remove="removeIngredient" 
        @updateImage="updateIngredientImage"
      />
    </div>
    <b-button @click="addIngredient">Add Ingredient</b-button>
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
      ingredients: this.value
    };
  },
  methods: {
    addIngredient() {
      this.ingredients.push({ name: '', amount: '', unit: '', consistency: '', image: '' });
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    updateIngredientImage({ index, image }) {
      this.$set(this.ingredients[index], 'image', image);
    }
  },
  watch: {
    ingredients: {
      handler(newIngredients) {
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
