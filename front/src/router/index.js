import { createRouter, createWebHistory } from 'vue-router'
import CardsList from "@/views/CardsList.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "cards_list",
      component: CardsList
    },
    {
      path: "/login",
      name: "user_login",
      component: Login,
    },
    {
      path: "/register",
      name: "user_register",
      component: Register,
    },
  ]
})

export default router
