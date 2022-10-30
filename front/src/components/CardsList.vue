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
          v-for="eyeShadow in data" 
          :key="eyeShadow._id" 
          class="group shadow-lg"
        >
          <Card :eyeShadow="eyeShadow"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from "@/components/Card.vue";
  import { useShadowsStore } from "@/stores/shadows.js";
  import { storeToRefs } from 'pinia'
  export default {
    name: "cards_list",
    components: {
      Card,
    },
    setup() {
      const store = useShadowsStore();
      store.getData();
      const { data } = storeToRefs(store);
      return { store, data }
    }
  };
</script>