<template>
  <SideBar />
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
  import SideBar from "@/components/Side-bar.vue";
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
      SideBar
    },
    setup() {
      const useInfiniteScroll = makeUseInfiniteScroll({});
      const intersectionTrigger = ref(null);
      const pageRef = useInfiniteScroll(intersectionTrigger);
      const userStore = useAuthStore();
      const { user } = storeToRefs(userStore);
      const store = useShadowsStore();
      const { shadows } = storeToRefs(store);
      const { toLoad } = storeToRefs(store);

      if (user.value) {
        store.getUserShadows();
      }

      watch(
        pageRef,
        page => {
          store.setPage(page);
        },
        { immediate: true }
      );

      watch(
        toLoad, reset,
        { immediate: true }
      );

      function reset() {
        const page = store.getPage;
        //  console.log("paginator reset triggered: " + page);
        //  console.log(pageRef);
          pageRef.value = page; 
      }

      return { store, shadows, intersectionTrigger }
    }
  };
</script>