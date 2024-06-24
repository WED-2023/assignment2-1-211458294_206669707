<template>
  <div>
  <div class="search-container">
    <!-- Search Input -->
    <b-form @submit.prevent="search">
      <b-form-input
        v-model="searchQuery"
        placeholder="Search for recipes..."
        class="search-input"
      ></b-form-input>

      <!-- Toggle Button -->
      <p>
        <a class="btn btn-primary" data-toggle="collapse" href="#collapseFilters" role="button" aria-expanded="false" aria-controls="collapseFilters">
          Advanced Filters
        </a>
      </p>

      <!-- Collapsible Section -->
      <div class="collapse" id="collapseFilters">
        <div class="card card-body">
          <!-- Filters Row -->
          <b-row class="filters-row">
            <!-- Results Per Page Dropdown -->
            <b-col cols="3" class="filter-col">
              <div class="dropdown-container">
                <label>Number Of Results:</label>
                <b-form-select v-model="resultsPerPage" :options="resultOptions" class="filter-select">
                </b-form-select>
              </div>
            </b-col>

            <!-- Dropdown 1 -->
            <b-col cols="3" class="filter-col">
              <div class="dropdown-container">
                <label>Cuisines</label>
                <vue-select
                  v-model="selectedValues1"
                  :options="options1"
                  multiple
                  placeholder="No Filter"
                  @input="handleSelectionChange('selectedValues1')"
                  class="wide-dropdown"
                ></vue-select>
                <b-button
                  variant="outline-danger"
                  class="mt-2 clear-button"
                  @click="clearSelection('selectedValues1')"
                >
                  Clear Filters
                </b-button>
              </div>
            </b-col>

            <!-- Dropdown 2 -->
            <b-col cols="3" class="filter-col">
              <div class="dropdown-container">
                <label>Diets</label>
                <vue-select
                  v-model="selectedValues2"
                  :options="options2"
                  multiple
                  placeholder="No Filter"
                  @input="handleSelectionChange('selectedValues2')"
                  class="wide-dropdown"
                ></vue-select>
                <b-button
                  variant="outline-danger"
                  class="mt-2 clear-button"
                  @click="clearSelection('selectedValues2')"
                >
                  Clear Filters
                </b-button>
              </div>
            </b-col>

            <!-- Dropdown 3 -->
            <b-col cols="3" class="filter-col">
              <div class="dropdown-container">
                <label>Intolerances</label>
                <vue-select
                  v-model="selectedValues3"
                  :options="options3"
                  multiple
                  placeholder="No Filter"
                  @input="handleSelectionChange('selectedValues3')"
                  class="wide-dropdown"
                ></vue-select>
                <b-button
                  variant="outline-danger"
                  class="mt-2 clear-button"
                  @click="clearSelection('selectedValues3')"
                >
                  Clear Filters
                </b-button>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>

      <!-- Submit Button -->
      <b-col cols="12" class="mt-3">
        <b-button type="submit" variant="primary" block>Search</b-button>
      </b-col>
      <b-alert v-if="searchQueryEmpty" show variant="danger">Search query cannot be empty</b-alert>
    </b-form>

    <!-- Last Search Alert -->
    <div v-if="isLoggedIn && lastSearchQuery !== null" class="mt-3">
      <b-alert show variant="info">Last Search: {{ lastSearchQuery }}</b-alert>
    </div>
  </div>
  <div v-if="searchPerformed">
  <b-alert v-if="noResultsFound" show variant="danger">No Results Found</b-alert>
  <div v-if="!noResultsFound">
    <div class="filter-section">
          <b-row class="filters-row">
            <b-col cols="12" class="filter-col">
              <div class="dropdown-container">
                <label>Filter By</label>
                <vue-select
                  v-model="selectedFilterType"
                  :options="filterOptions"
                  placeholder="Select a filter"
                  class="cool-dropdown"
                  @input="updateSelectedFilterType"
                ></vue-select>
              </div>
            </b-col>
          </b-row>
        </div>
        <RecipePreviewList
        ref="recipePreviewList"
        title="Search Results"
        :amountToFetch="currentAmountToFetch"
      ></RecipePreviewList>
  <!-- <RecipePreviewList
      ref="recipePreviewList"
      title="Search Results"
      :amountToFetch="currentAmountToFetch"
      :class="{
        RandomRecipes: true,
        center: true
      }"
    ></RecipePreviewList> -->
  </div>
    </div>
</div>
</template>

<script>
import {EventBus, shared_data } from '@/main.js';
import recipeFilters from '../assets/recipeFilters';
import { required, alpha } from "vuelidate/lib/validators";
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetRelevantRecipesForSearch } from '../services/recipes';
import { mockGetRecipesPreview } from "../services/recipes.js";

export default {
  components: {
    VueSelect,
    RecipePreviewList
  },
  data() {
    return {
      shared_data,
      searchQuery: '',
      lastSearchQuery: localStorage.getItem('lastSearchQuery'),
      searchQueryEmpty: false,
      resultsPerPage: 5,
      resultOptions: [5, 10, 15],
      options1: recipeFilters.cuisines.map(cuisine => ({ value: cuisine, label: cuisine })),
      options2: recipeFilters.diets.map(diet => ({ value: diet, label: diet })),
      options3: recipeFilters.intolerances.map(intolerance => ({ value: intolerance, label: intolerance })),
      selectedValues1: [],
      selectedValues2: [],
      selectedValues3: [],
      searchPerformed: false,
      noResultsFound: false,
      currentAmountToFetch: 5,
      selectedFilterType: null,
      filterOptions: [
        { value: 'preparationTime', label: 'Preparation Time' },
        { value: 'popularity', label: 'Popularity' }
      ],
    };
  },
  mounted() {
    console.log("hi");
    EventBus.$on('user-logged-in', (username) => {
      // Handle logic when user logs in
      shared_data.username = username;
      this.loadLastSearchQuery();
    });

    EventBus.$on('user-logged-out', () => {
      // Handle logic when user logs out
      shared_data.username = null;
      this.lastSearchQuery = null; // Clear last search query display
    });
  },
  validations: {
    searchQuery: {
      required,
      alpha
    }
  },
  created() {
    this.loadLastSearchQuery();
    // Listen for browser's back/forward navigation events
    window.addEventListener('popstate', this.handlePopState);
  },
  destroyed() {
    // Cleanup event listener when component is destroyed
    window.removeEventListener('popstate', this.handlePopState);
  },
  watch: {
    resultsPerPage(newVal) {
      this.currentAmountToFetch = newVal;
    },
    // selectedFilterType(newVal) {
    //   this.updateSelectedFilterType(newVal);
    // }
  },
  computed:{
    isLoggedIn() {
      return shared_data.username !== null;
    },
  // sortedRecipes() {
  //   let sorted = [...this.recipes]; // Assuming `recipes` is your data array
  //   if (this.selectedFilterType === 'popularity') {
  //     sorted.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
  //   } else if (this.selectedFilterType === 'preparationTime') {
  //     sorted.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  //   }
  //   return sorted;
  // }
  },
  methods: {
    sortArray() {
    if (this.selectedFilterType === "popularity" || this.selectedFilterType === "preparationTime") {
      // Invoke the method in child component
      this.$refs.recipePreviewList.sortRecipes(this.selectedFilterType);
    }
  },
  //   sortArray() {
  //     const response = mockGetRecipesPreview(this.currentAmountToFetch); // Adjust based on actual data fetching
  //     const recipes = response.data.recipes; // Assuming this structure based on mockGetRecipesPreview
  //     // Sort sortedItems based on selectedFilterType
  //     if (this.selectedFilterType === "popularity") {
  //       recipes.sort((a, b) => a.aggregateLikes - b.aggregateLikes);
  //     } else if (this.selectedFilterType === "preparationTime") {
  //       recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  //     }
  //     this.sortedItems = [...recipes]; // Update sortedItems with sorted recipes
  //     // this.$nextTick(() => {
  //     //   this.$refs.recipePreviewList.updateRecipes(this.sortedItems);
  //     // });
  //     console.log("see the sorted array: ", this.sortedItems)
  // },
    handlePopState(event) {
      const state = event.state;
      if (state && state.searchPageState) {
        const { searchQuery, selectedValues1, selectedValues2, selectedValues3, selectedFilterType } = state.searchPageState;
        this.searchQuery = searchQuery || '';
        this.selectedValues1 = selectedValues1 || [];
        this.selectedValues2 = selectedValues2 || [];
        this.selectedValues3 = selectedValues3 || [];
        this.selectedFilterType = selectedFilterType || null;
        this.search();
      }
    },
    search() {
      console.log("adi");
      console.log(shared_data.username);
      if (this.searchQuery.trim() === '') {
        this.searchQueryEmpty = true;
        return;
      }
      this.searchQueryEmpty = false;
      console.log('Search query:', this.searchQuery);
      if (this.isLoggedIn) { // Check if user is signed in
        localStorage.setItem('lastSearchQuery', this.searchQuery);
        this.lastSearchQuery = this.searchQuery;
      } else {
        this.lastSearchQuery = ''; // Clear last search query for guest users
      }
            // Save search state to history state
            const searchPageState = {
        searchQuery: this.searchQuery,
        selectedValues1: this.selectedValues1,
        selectedValues2: this.selectedValues2,
        selectedValues3: this.selectedValues3,
        selectedFilterType: this.selectedFilterType
      };
      history.pushState({ searchPageState }, null); // Save state to browser history
      try {
        const response = mockGetRelevantRecipesForSearch(true);

        if (response.status === 200) {
          this.noResultsFound = false;
        } else {
          this.noResultsFound = true;
        }
      } catch (error) {
        console.error(error);
        if (error.status === 409) {
          this.noResultsFound = true;
        } else {
          this.noResultsFound = false; // Handle other errors if necessary
        }
      }
      this.searchPerformed = true;
      this.currentAmountToFetch = this.resultsPerPage;
      try {
        // Fetch recipes based on amountToFetch
        console.log("right now this.amountToFetch: ", this.currentAmountToFetch);
        const response = mockGetRecipesPreview(this.currentAmountToFetch);
        const recipes = response.data.recipes;
        
        // Update localRecipes with the fetched recipes
        const newRecipes = [...recipes];
        console.log("this.$refs.recipePreviewList.modifyRecipes(newRecipes)");
      // this.$refs.recipePreviewList.modifyRecipes(newRecipes);
        this.$nextTick(() => {
        if (this.$refs.recipePreviewList) {
          console.log("Calling modifyRecipes with newRecipes:", newRecipes);
          this.$refs.recipePreviewList.modifyRecipes(newRecipes,this.selectedFilterType);
        } else {
          console.error("recipePreviewList is not defined");
        }
      });
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
      // this.searchQuery = ''; // Clear the search box value after search
    },
    loadLastSearchQuery() {
      if (this.isLoggedIn) {
        this.lastSearchQuery = localStorage.getItem('lastSearchQuery') || '';
      }
    },
    handleSelectionChange(dropdown) {
      if (this[dropdown].includes('clear')) {
        this.clearSelection(dropdown);
      }
    },
    clearSelection(dropdown) {
      this.$set(this, dropdown, []);
    },
    clearFilterSelection() {
      this.selectedFilterType = null;
    },
    updateSelectedFilterType(value) {
      console.log("didush updateSelectedFilterType");
      this.selectedFilterType = value ? value.value : null;
      console.log("this.selectedFilterType: ", value);
      const response = mockGetRecipesPreview(this.currentAmountToFetch);
        const recipes = response.data.recipes;
        
        // Update localRecipes with the fetched recipes
        const newRecipes = [...recipes];
        console.log("in updateSelectedFilterType");
      // this.$refs.recipePreviewList.modifyRecipes(newRecipes);
        this.$nextTick(() => {
        if (this.$refs.recipePreviewList) {
          console.log("Calling modifyRecipes with newRecipes:", newRecipes);
          this.$refs.recipePreviewList.modifyRecipes(newRecipes, this.selectedFilterType);
        } else {
          console.error("recipePreviewList is not defined");
        }
      });
    }
    // sortRecipesInChild() {
    //   if (this.selectedFilterType) {
    //     this.$refs.recipePreviewList.sortRecipes(this.selectedFilterType);
    //   }
    // }
  }
};
</script>

<style scoped>
.search-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search-input {
  font-size: 18px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
}

.filters-row {
  margin-top: 20px;
}

.filter-col {
  margin-bottom: 20px;
}

.dropdown-container {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.label {
  font-weight: bold;
  margin-bottom: 8px;
}

.dropdown-container {
  display: inline-block; /* Ensure it only takes necessary width */
  margin-bottom: 10px; /* Adjust margin as needed */
}

.clear-button {
  margin-top: 10px;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
}

.clear-button:hover {
  background-color: #ff4d4d;
  border-color: #ff4d4d;
  color: white;
}

.cool-dropdown {
  width: 200px; /* Adjust the width as needed */
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  padding: 8px;
  transition: all 0.3s ease;
}

.cool-dropdown .vs__dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cool-dropdown .vs__dropdown-menu {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cool-dropdown .vs__dropdown-option {
  padding: 10px;
  cursor: pointer;
}

.cool-dropdown .vs__dropdown-option:hover {
  background-color: #f0f0f0;
}

.clear-button {
  margin-top: 10px;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
}

.clear-button:hover {
  background-color: #ff4d4d;
  border-color: #ff4d4d;
  color: white;
}
</style>