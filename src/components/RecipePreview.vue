<template>
  <div class="recipe-preview">
    <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }" class="router-link-inner">
      <b-card
        :key="recipe.id"
        :title="recipe.title"
        :img-src="recipe.image"
        :img-alt="recipe.title"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
        :class="{ 'clicked-recipe': clicked && isLoggedIn }"
        @click.prevent="handleClick"
      >
        <b-card-text>
          Ready in {{ recipe.readyInMinutes }} minutes
          <br>
          Popularity: {{ recipe.popularity }} likes
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
    <b-button v-if="isLoggedIn" @click.stop="toggleFavorite" class="favorite-icon" variant="link">
      <b-icon :icon="isFavorite ? 'heart-fill' : 'heart'"></b-icon>
    </b-button>
  </div>
</template>

<script>
import { mockAddFavorite } from '../services/user.js';
import { EventBus } from '@/main.js';

export default {
  name: "RecipePreview",
  data() {
    return {
      clicked: false,
      isFavorite: false,
      // isLoggedIn: !!localStorage.getItem('shared_data.username')
      isLoggedIn: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick(event) {
      console.log("handleClick");
      this.markAsClicked(); 
      this.$router.push({ name: 'recipe', params: { recipeId: this.recipe.id } });
    },
    markAsClicked() {
      console.log("markAsClicked");
      console.log(this.isLoggedIn);
      if (this.isLoggedIn) {
        this.clicked = true;
        localStorage.setItem(`recipe_${this.recipe.id}_clicked`, 'true');
        console.log('Recipe ID:', this.recipe.id); // Log the recipe ID here
      }
    },
    checkClicked() {
      console.log("see: ", localStorage.getItem(`recipe_${this.recipe.id}_clicked`));
      const clickedState = localStorage.getItem(`recipe_${this.recipe.id}_clicked`);
      this.clicked = clickedState === 'true';
      console.log("clicked: ", this.clicked);
    },
    toggleFavorite() {
      // i changed:
      this.isFavorite = !this.isFavorite;
      // this.isFavorite = true;
      localStorage.setItem(`recipe_${this.recipe.id}_favorite`, this.isFavorite ? 'true' : 'false');
      const response = mockAddFavorite(recipeDetails);
      // TODO: add like to the like count of this recipe
    },
    checkFavorite() {
      const favoriteState = localStorage.getItem(`recipe_${this.recipe.id}_favorite`);
      this.isFavorite = favoriteState === 'true';
    },
    updateLoggedIn() {
      this.isLoggedIn = !!localStorage.getItem('username');
      this.checkClicked();
      this.checkFavorite();
    },
    handleLogout() {
      // Clear relevant localStorage entries on user logout
      localStorage.removeItem(`recipe_${this.recipe.id}_clicked`);
      localStorage.removeItem(`recipe_${this.recipe.id}_favorite`);
      this.clicked = false;
      this.isFavorite = false;
      this.isLoggedIn = false;
    }
  },
  created() {
    this.updateLoggedIn();//MAYBE TO REMOVE
  EventBus.$on('user-logged-in', this.updateLoggedIn);
  EventBus.$on('user-logged-out', this.handleLogout);
  // this.checkClicked();
  // this.checkFavorite();
  console.log("in created: ", this.clicked)
},
  beforeDestroy() {
    // Clean up event listeners
    EventBus.$off('user-logged-in', this.updateLoggedIn);
    EventBus.$off('user-logged-out', this.handleLogout);
  },
  // mounted() {
  //   this.updateLoggedIn();
  // }
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

.router-link-inner {
  display: block;
  text-decoration: none;
}

.clicked-recipe {
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