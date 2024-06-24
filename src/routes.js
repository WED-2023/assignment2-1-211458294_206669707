import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import FavoritesPage from "./pages/FavoritesPage"
import MyRecipes from "./pages/MyRecipesPage"
import AboutPage from "./pages/AboutPage.vue";
import FamilyRecipePage from "./pages/FamilyReciepsPage.vue";
import RecipeViewPage from "./pages/RecipeViewPage.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  // {
  //   path: " ",
  //   name: "recipe",
  //   component: () => import("./pages/RecipeViewPage"),
  // },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/favorite-recipes",
    name: "favorites",
    component: FavoritesPage,
  },
  {
    path: "/my-recipes",
    name: "myrecipes",
    component: MyRecipes,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/family-recipes",
    name: "familyrecipes",
    component: FamilyRecipePage,
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: RecipeViewPage,
  }
];

export default routes;
