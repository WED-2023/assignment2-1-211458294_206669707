<template>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#">Home Page</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Search</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">About</a>
      </li>
    <li class="nav-item" v-if="isUserSignedIn">
        <a class="nav-link" href="#">Add New Recipe</a>
      </li>
    <li class="nav-item dropdown ml-auto" v-if="!isUserSignedIn">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Hello Guest</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Login</a>
          <div class="dropdown-divider"></div>
          <router-link to="/register" class="dropdown-item">Sign In</router-link>
        </div>
      </li>
    <li class="nav-item dropdown ml-auto" v-if="isUserSignedIn">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Personal</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Favorite Recipes</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">My Recipes</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Family Recipes</a>
        </div>
      </li>
      <li class="nav-item dropdown" v-if="isUserSignedIn">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Name</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Sign Out</a>
        </div>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    name: 'NavigationBar',
    data() {
    return {
      isUserSignedIn: false
    };
  }
  };
  </script>
  
  <style scoped>
  /* You can add your custom styles here */
  .nav-tabs {
    margin-bottom: 20px;
  }
  </style>
  