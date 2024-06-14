<template>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link to="/" class="nav-link" active-class="active">Home Page</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/search" class="nav-link" active-class="active">Search</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-link" active-class="active">About</router-link>
      </li>
    <li class="nav-item" v-if="isUserSignedIn">
      <router-link to="/add-recipe" class="nav-link" active-class="active">Add New Recipe</router-link>
      </li>
    <li class="nav-item dropdown ml-auto" v-if="!isUserSignedIn">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Hello Guest</a>
        <div class="dropdown-menu">
          <router-link to="/login" class="dropdown-item">Login</router-link>
          <div class="dropdown-divider"></div>
          <router-link to="/register" class="dropdown-item">Sign In</router-link>
        </div>
      </li>
    <li class="nav-item dropdown ml-auto" v-if="isUserSignedIn">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Personal</a>
        <div class="dropdown-menu">
          <router-link to="/favorite-recipes" class="dropdown-item">Favorite Recipes</router-link>
          <div class="dropdown-divider"></div>
          <router-link to="/my-recipes" class="dropdown-item">My Recipes</router-link>
          <div class="dropdown-divider"></div>
          <router-link to="/family-recipes" class="dropdown-item">Family Recipes</router-link>
        </div>
      </li>
      <li class="nav-item dropdown" v-if="isUserSignedIn">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{{ username }}</a>
        <div class="dropdown-menu">
          <button class="dropdown-item" @click="signOut">Sign Out</button>
        </div>
      </li>
    </ul>
  </template>
  
  <script>
  import { EventBus, shared_data } from '@/main.js';
  export default {
    name: 'NavigationBar',
    data() {
    return {
    username: null,
    isUserSignedIn: false
  };
  },
  created() {
    EventBus.$on('user-logged-in', this.updateUser);
    EventBus.$on('user-logged-out', this.updateUser);
  },
  beforeDestroy() {
    EventBus.$off('user-logged-in', this.updateUser);
    EventBus.$off('user-logged-out', this.updateUser);
  },
  methods: {
    updateUser() {
    this.username = localStorage.getItem('username');
    this.isUserSignedIn = !!this.username;
  },
  signOut() {
      console.log("Sign-out button clicked");
      shared_data.logout(); // Clear username from local storage
      console.log("here!");
      this.username = null; // Update component's username state
      this.isUserSignedIn = false; // Update component's signed-in state
      localStorage.removeItem('lastSearchQuery'); // Clear last search query
      this.$router.push('/'); // Redirect to home page or any desired route
    }
  }
  };
  </script>
  
  <style scoped>
  /* You can add your custom styles here */
  .nav-tabs {
    margin-bottom: 20px;
  }
  </style>
  