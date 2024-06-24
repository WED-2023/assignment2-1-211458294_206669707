<template>
  <div>
    <ul class="nav nav-tabs bg-light rounded shadow-sm">
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
        <router-link to="#" class="nav-link" @click.native="showNewRecipeModal">Add New Recipe</router-link>
      </li>
      <!-- Adjusted conditional rendering for "Hello Guest" dropdown -->
      <li class="nav-item dropdown ml-auto" v-if="!isUserSignedIn"> <!-- Show only if not signed in -->
        <a class="nav-link dropdown-toggle text-dark" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Hello Guest</a>
        <div class="dropdown-menu dropdown-menu-right">
          <router-link to="/login" class="dropdown-item">Login</router-link>
          <router-link to="/register" class="dropdown-item">Sign In</router-link>
        </div>
      </li>
      <li class="nav-item dropdown ml-auto" v-if="isUserSignedIn"> <!-- Show only if signed in -->
        <a class="nav-link dropdown-toggle text-dark" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{{ username }}</a>
        <div class="dropdown-menu dropdown-menu-right">
          <router-link to="/favorite-recipes" class="dropdown-item">Favorite Recipes</router-link>
          <router-link to="/my-recipes" class="dropdown-item">My Recipes</router-link>
          <router-link to="/family-recipes" class="dropdown-item">Family Recipes</router-link>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item" @click="signOut">Sign Out</button>
        </div>
      </li>
    </ul>
    <NewRecipeModal :visible="newRecipeModalVisible" @close="hideNewRecipeModal"></NewRecipeModal>
  </div>
</template>

<script>
import { EventBus, shared_data } from '@/main.js';
import NewRecipeModal from './NewRecipeModal.vue';

export default {
  name: 'NavigationBar',
  data() {
    return {
      username: null,
      isUserSignedIn: false,
      newRecipeModalVisible: false // Track modal visibility
    };
  },
  components: {
    NewRecipeModal
  },
  created() {
    this.updateUser();
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
    showNewRecipeModal() {
      this.newRecipeModalVisible = true;
    },
    hideNewRecipeModal() {
      this.newRecipeModalVisible = false;
    },
    signOut() {
      shared_data.logout();
      this.username = null;
      this.isUserSignedIn = false;
      localStorage.removeItem('lastSearchQuery');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.nav-tabs {
  margin-bottom: 20px;
}

.nav-link {
  color: #333; /* Darker text color */
}

/* Colorful Styling */
.nav-link:hover,
.nav-link.active {
  background-color: #4e73df; /* Another shade of blue for hover/active */
  color: #fff; /* White text color */
}

.dropdown-toggle {
  color: #333; /* Dark text color */
}

.dropdown-toggle:hover {
  color: #4e73df; /* Blue hover color */
}

.dropdown-item:hover {
  background-color: #f8f9fa; /* Light gray background on hover */
}

.dropdown-menu {
  border: none; /* No border */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

.dropdown-item {
  color: #333; /* Darker text color */
}

.dropdown-divider {
  margin: 0.5rem 0;
  border-color: rgba(0, 0, 0, 0.1); /* Lighter divider */
}

.dropdown-toggle::after {
  display: none; /* Hide default caret */
}

.dropdown-menu.show {
  display: block; /* Ensure dropdown shows */
}
</style>
