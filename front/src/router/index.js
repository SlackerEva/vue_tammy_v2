import { createRouter, createWebHistory } from 'vue-router'
import CardsList from "@/views/CardsList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "cards_list",
      component: CardsList
    },
  ]
})

export default router
