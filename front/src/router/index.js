import { createRouter, createWebHistory } from 'vue-router'
import CardsList from "@/components/CardsList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "cards_list",
      component: CardsList,
      meta: {
        title: "cards_list",
        auth: false,
      },
    },
  ]
})

export default router
