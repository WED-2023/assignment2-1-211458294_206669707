<template>
  <div class="recipe-preview">
    <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-link"
      :class="{ 'clicked-recipe-link': clicked }"
      @click.native="markAsClicked"
    >
      <b-card
        :key="recipe.id"
        :title="recipe.title"
        :img-src="recipe.image"
        :img-alt="recipe.title"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          Ready in {{ recipe.readyInMinutes }} minutes
          <br>
          Popularity: {{ recipe.aggregateLikes }} likes
          <br>
          Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}
          <br>
          Vegetarian: {{ recipe.vegetarian ? 'Yes' : 'No' }}
          <br>
          Gluten-free: {{ recipe.glutenFree ? 'Yes' : 'No' }}
          <br>
        </b-card-text>
      </b-card>
    </router-link>
    <b-button @click.stop="toggleFavorite" class="favorite-icon" variant="link">
      <b-icon :icon="isFavorite ? 'heart-fill' : 'heart'"></b-icon>
    </b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clicked: false,
      isFavorite: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    markAsClicked() {
      this.clicked = true;
      localStorage.setItem(`recipe_${this.recipe.id}_clicked`, true);
    },
    checkClicked() {
      this.clicked = localStorage.getItem(`recipe_${this.recipe.id}_clicked`) === 'true';
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      this.isFavorite = true;
      localStorage.setItem(`recipe_${this.recipe.id}_favorite`, this.isFavorite);
    },
    checkFavorite() {
      this.isFavorite = localStorage.getItem(`recipe_${this.recipe.id}_favorite`) === 'true';
    }
  },
  mounted() {
    this.checkClicked();
    this.checkFavorite();
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}

.recipe-link {
  display: block;
  text-decoration: none;
}

.clicked-recipe-link {
  color: purple;
}

.favorite-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 24px;
  z-index: 1;
  cursor: pointer;
  background-color: transparent;
  border: none;
}

.favorite-icon b-icon {
  font-size: 24px;
  color: gold;
}
</style>
