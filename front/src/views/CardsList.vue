<template>
  <div class="bg-white">
    <!-- margin-auto, max-w-80rem, paddings, -->
    <div 
      class="mx-auto lg:max-w-7xl
      py-16 px-4 sm:py-24 sm:px-8"
    >
      <div 
        class="grid 
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
        gap-y-10 gap-x-6 xl:gap-x-8"
      >
        <div 
          v-for="eyeShadow in shadows" 
          :key="eyeShadow._id" 
          class="group shadow-lg"
        >
          <Card :eyeShadow="eyeShadow"/>
        </div>
        <div ref="intersectionTrigger"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from "@/components/Card.vue";
  import { useShadowsStore } from "@/stores/shadows.js";
  import { useAuthStore } from "@/stores/auth.js";
  import { storeToRefs } from 'pinia';
  import { ref,watch  } from "vue";
  import { makeUseInfiniteScroll } from "vue-use-infinite-scroll";
  export default {
    name: "cards_list",
    components: {
      Card,
    },
    setup() {
      const useInfiniteScroll = makeUseInfiniteScroll({});
      const intersectionTrigger = ref(null);
      const pageRef = useInfiniteScroll(intersectionTrigger);
      const userStore = useAuthStore();
      const { user } = storeToRefs(userStore);
      const store = useShadowsStore();

      if (user.value) {
        store.getUserShadows();
        store.removeShadows();
      }

      watch(
        pageRef,
        page => {
          //console.log(pageRef, page-1);
          //page -1, потому что pageRef начинается с 1, если убрать первая 10 карточек пропадет
          store.setPage(page-1);
          store.getShadows();
        },
        { immediate: true }
      );

      const { shadows } = storeToRefs(store);
      return { store, shadows, intersectionTrigger }
    }
  };
</script>