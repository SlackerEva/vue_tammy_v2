<template>
  <div class="overflow-hidden rounded-lg">
    <a :href="eyeShadow.link" target="_blank">
      <img 
        :src="eyeShadow.imgPath" 
        :alt="eyeShadow.name" 
        class="group-hover:opacity-75" 
      />
    </a>
  </div>
  <div class="flex place-content-between p-3">
    <h3 class="font-bold text-black-900 truncate">
      {{ eyeShadow.name }}
    </h3>
    <Bookmark_btn :shadowID="eyeShadow.id" v-if="user"/>
  </div>
</template>

<script>
  import Bookmark_btn from '@/components/UI/bookmarkBtn.vue';
  import { useAuthStore } from "@/stores/auth.js";
  import { storeToRefs } from 'pinia';
  export default {
    name: "card_box",
    components: {
      Bookmark_btn,
    },
    props: {
      eyeShadow: Object
    },
    setup() {
      const store = useAuthStore();
      const { user } = storeToRefs(store);
      return { store, user }
    }
  }
</script>