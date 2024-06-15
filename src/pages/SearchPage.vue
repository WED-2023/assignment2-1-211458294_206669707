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
    </b-form>

    <!-- Last Search Alert -->
    <div v-if="lastSearchQuery" class="mt-3">
      <b-alert show variant="info">Last Search: {{ lastSearchQuery }}</b-alert>
    </div>
  </div>
  <RecipePreviewList title="Random Recipes" class="RandomRecipes center" />
</div>
</template>

<script>
import { shared_data } from '@/main.js';
import recipeFilters from '../assets/recipeFilters';
import { required, alpha } from "vuelidate/lib/validators";
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    VueSelect,
  },
  data() {
    return {
      searchQuery: '',
      lastSearchQuery: '',
      resultsPerPage: 5,
      resultOptions: [5, 10, 15],
      options1: recipeFilters.cuisines.map(cuisine => ({ value: cuisine, label: cuisine })),
      options2: recipeFilters.diets.map(diet => ({ value: diet, label: diet })),
      options3: recipeFilters.intolerances.map(intolerance => ({ value: intolerance, label: intolerance })),
      selectedValues1: [],
      selectedValues2: [],
      selectedValues3: [],
    };
  },
  validations: {
    searchQuery: {
      required,
      alpha
    }
  },
  created() {
    this.loadLastSearchQuery();
  },
  methods: {
    search() {
      console.log('Search query:', this.searchQuery);
      if (shared_data.username) { // Check if user is signed in
        localStorage.setItem('lastSearchQuery', this.searchQuery);
        this.lastSearchQuery = this.searchQuery;
      } else {
        this.lastSearchQuery = ''; // Clear last search query for guest users
      }
      this.searchQuery = ''; // Clear the search box value after search
      // Add your search logic here
    },
    loadLastSearchQuery() {
      const username = localStorage.getItem('username');
      if (username) {
        this.lastSearchQuery = localStorage.getItem('lastSearchQuery');
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

.wide-dropdown {
  width: 100%;
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
