<template>
  <div>
    <b-form @submit.prevent="search">
      <b-row>
        <b-col cols="6"> <!-- Adjust the width as needed -->
          <b-form-input
            v-model="searchQuery"
            placeholder="Enter your searched recipe..."
            class="small-search-box"
          ></b-form-input>
        </b-col>
        <b-col cols="2">
          <b-form-select v-model="resultsPerPage" :options="resultOptions">
            <template #first>
              <option value="" disabled>Select Results Per Page</option>
            </template>
          </b-form-select>
        </b-col>
        <b-col cols="2">
          <b-button type="submit" variant="primary">Search</b-button>
        </b-col>
      </b-row>
    </b-form>
    <div v-if="lastSearchQuery" class="mt-3">
      <b-alert show variant="info">Last Search: {{ lastSearchQuery }}</b-alert>
    </div>
  </div>
</template>

<script>
import { shared_data } from '@/main.js';
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      searchQuery: '',
      lastSearchQuery: '',
      resultsPerPage: 5,
      resultOptions: [5, 10, 15]
    };
  },
  validations:{
    searchQuery:{
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
      // Clear the search box value after search
      this.searchQuery = '';
      // Add your search logic here
    },
    loadLastSearchQuery() {
      const username = localStorage.getItem('username');
      console.log("adi",username);
      if (username) {
        this.lastSearchQuery = localStorage.getItem('lastSearchQuery');
      }
    }
  }
}
</script>

<style>
.small-search-box {
  width: 100%; /* Adjust width to your desired size */
}
</style>
