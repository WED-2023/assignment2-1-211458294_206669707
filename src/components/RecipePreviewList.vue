<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <!-- <b-col v-for="r in localRecipes" :key="r.id"> -->
        <b-col v-for="(r, index) in localRecipes" :key="`${r.id}-${index}`">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview } from "../services/recipes.js";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    amountToFetch: {
      type: Number,
      default: 4
    },
    recipes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      localRecipes: []
    };
  },
  mounted() {
    console.log("RecipePreviewList has been mounted");
  },
  created() {
    // this.updateRecipes();
    // Initialize localRecipes with the current recipes prop
    this.localRecipes = [...this.recipes];
  },
  watch: {
    // recipes: {
    //   immediate: true,
    //   handler(newVal) {
    //     this.localRecipes = [...newVal];
    //   }
    // },
    recipes: {
    // immediate: true,
    // handler(newRecipes) {
    //   this.modifyRecipes(newRecipes);
    // }
    immediate: true,
      handler(newRecipes) {
        this.localRecipes = [...newRecipes];
      }
  },
    amountToFetch(newVal) {
      this.updateRecipes();
    },
    // sortingCriteria(newVal) {
    //   this.sortRecipes(newVal);
    // }
  },
  // computed: {
  //   sortRecipes(criteria) {
  //     console.log("it did entered sortRecipes: ", this.recipes);
  //     if (criteria === "popularity") {
  //       this.recipes.sort((a, b) => a.aggregateLikes - b.aggregateLikes);
  //     } else if (criteria === "preparationTime") {
  //       this.recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  //     }
  //     console.log("after sorting: in preview list", this.recipes);
  //   },
  //   // localRecipes() {
  //   //   return [...this.recipes];
  //   // }
  // },
  methods: {
    updateRecipes() {
      try {
        // Fetch recipes based on amountToFetch
        const response = mockGetRecipesPreview(this.amountToFetch);
        const recipes = response.data.recipes;
        
        // Update localRecipes with the fetched recipes
        this.localRecipes = [...recipes];
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },
    modifyRecipes(newRecipes, criteria){
      console.log("entered modifyRecipes");
      this.localRecipes = newRecipes;
      console.log("in modifyRecipes: ", this.localRecipes);
      console.log("criteria: ", criteria);
      this.sortRecipes(criteria);
      
      // const groupedRecipes = this.groupRecipesById(newRecipes);

      // // Sort each group based on criteria
      // const sortedRecipes = this.sortRecipesInGroups(groupedRecipes, criteria);

      // // Flatten the sorted groups back into a single array
      // this.localRecipes = sortedRecipes.flat();

      // console.log("Modified recipes:", this.localRecipes);
    },
    groupRecipesById(recipes) {
    const grouped = recipes.reduce((acc, recipe) => {
      const key = recipe.id;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(recipe);
      return acc;
    }, {});

    // Convert object back to array of arrays (groups)
    return Object.values(grouped);
  },
  sortRecipesInGroups(groups, criteria) {
    return groups.map(group => {
      if (criteria === "popularity") {
        group.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
      } else if (criteria === "preparationTime") {
        group.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
      }
      return group;
    });
  },
    sortRecipes(criteria) {
      // let sortedRecipes = [...this.localRecipes];
      // if (criteria === "popularity") {
      //   sortedRecipes.sort((a, b) => b.popularity - a.popularity);
      // } else if (criteria === "preparationTime") {
      //   sortedRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
      // }
      // this.localRecipes = sortedRecipes;
      // console.log("after sorting: in preview list", this.localRecipes);
      let sortedRecipes = [...this.localRecipes]; // Copy the recipes prop

      if (criteria === "popularity") {
        sortedRecipes.sort((a, b) => b.popularity - a.popularity); // Sort by popularity
      } else if (criteria === "preparationTime") {
        sortedRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes); // Sort by time
      }
      this.localRecipes = sortedRecipes;
    },
    // updateRecipes() {
    //   try {
    //     // const response = await this.axios.get(
    //     //   this.$root.store.server_domain + "/recipes/random",
    //     // );

    //     // const amountToFetch = 4; // Set this to how many recipes you want to fetch
    //     const response = mockGetRecipesPreview(this.amountToFetch);


    //     console.log(response);
    //     const recipes = response.data.recipes;
    //     console.log(recipes);
    //     this.recipes = [];
    //     this.recipes.push(...recipes);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // sortRecipes(criteria) {
    //   console.log("it did entered sortRecipes: ", this.recipes);
    //   if (criteria === "popularity") {
    //     this.recipes.sort((a, b) => a.aggregateLikes - b.aggregateLikes);
    //   } else if (criteria === "preparationTime") {
    //     this.recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
    //   }
    //   console.log("after sorting: in preview list", this.recipes);
    // },
    getRandomRecipes() {
      // Fetch recipes data
      this.recipes = mockGetRecipesPreview(4);
      console.log("show recipes before random:");
      console.log(typeof this.recipes);

      // Access the recipes array
      const recipesArray = this.recipes.data.recipes;

      // Step 1: Shuffle the recipes array (Fisher-Yates shuffle algorithm)
      const shuffled = recipesArray.slice(); // Create a copy to avoid mutating the original array
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Step 2: Select three random recipes
      const threeRandomRecipes = shuffled.slice(0, 3);

      this.recipes = [];
      this.recipes.push(...threeRandomRecipes);
}
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>