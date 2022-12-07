import { createRouter, createWebHistory } from 'vue-router'
import CardsList from "@/views/CardsList.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ForgottenPass from "@/views/Forgotten-pass.vue";
import ResetPass from "@/views/Reset-pass.vue";

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
    {
      path: "/forgotten-pass",
      name: "user_forgotten-pass",
      component: ForgottenPass,
    },
    {
      path: `/reset-password`,
      name: "user_reset-pass",
      component: ResetPass,
      props: (route) => ({ id: route.query.id, token: route.query.token }),  
    }
  ]
})

export default router
