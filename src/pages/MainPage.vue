<template>
  <div class="container">
    <RecipePreviewList ref="recipePreviewList" title="🍳 Explore These Recipes" class="RandomRecipes center" amountToFetch="3" />
    <b-button variant="primary" class="mt-3" @click="fetchOtherRecipes">
      Show Me More Recipes
    </b-button>
    <router-link v-if="!$root.store.username" to="/login" tag="button">Login to View More</router-link>
    <!-- <RecipePreviewList
      title="Recently Viewed Recipes"
      :amountToFetch="3"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList> -->
    <RecipePreviewList
    title="Recently Viewed Recipes"
    :recipes="recentRecipes"
    :amountToFetch="3"
    :class="{
      RandomRecipes: true,
      blur: !$root.store.username,
      center: true
    }"
></RecipePreviewList>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  data() {
  return {
    recentRecipes: []
  };
},
  components: {
    RecipePreviewList
  },
  methods: {
    async fetchOtherRecipes() {
      await this.$refs.recipePreviewList.getRandomRecipes(3);
    }
  },
  mounted() {
    // Call fetchOtherRecipes as soon as the component is mounted
    this.fetchOtherRecipes();
    this.recentRecipes = JSON.parse(localStorage.getItem('recentRecipes')) || [];
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.RandomRecipes {
  margin: 20px 0;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.blur {
  filter: blur(2px);
  opacity: 0.7;
  transition: opacity 0.3s ease-in-out;
}

.blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.b-button {
  font-weight: bold;
  text-transform: uppercase;
  background-color: #3490dc;
  border-color: #3490dc;
  &:hover {
    background-color: #2779bd;
    border-color: #2779bd;
  }
}

.router-link-button {
  background-color: #6c757d;
  border-color: #6c757d;
  &:hover {
    background-color: #5a6268;
    border-color: #5a6268;
  }
}
</style>
