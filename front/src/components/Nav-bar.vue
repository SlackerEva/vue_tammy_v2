<template>
  <header class="bg-light-green text-white">
    <nav class="py-5 px-5 md:px-14 flex flex-col sm:flex-row gap-4 items-center">
      <button v-if="user" @click="onSideBarClick">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor" 
          class="w-6 h-6"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>
      <div class="flex items-center gap-x-4">
        <router-link :to="{ name: 'cards_list' }">
          <h1 class="text-lg">
            Tammy
          </h1>
        </router-link>
      </div>
      <div class="form-control flex">
        <input 
          type="text" 
          v-model="search" 
          class="input input-bordered border 
          bg-gray-50 mr-5 border-gray-300 text-gray-900 text-sm 
          rounded-lg focus:ring-blue-500 focus:border-blue-500 
          w-full md:w-64 p-2.5" 
        />
        <button 
          @click="onSearchClick"
          class="inline-block text-sm px-4 py-2 leading-none 
          border rounded text-white border-white
          hover:border-transparent hover:text-teal-500 
          hover:bg-white" 
        >
          Поиск
        </button>
      </div>
      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'user_login' }">
          Вход
        </router-link>
        <li v-if="user" @click="logout" class="cursor-pointer">
          Выход
        </li>
      </ul> 
    </nav>
  </header>
</template>

<script>
  import { useShadowsStore } from "@/stores/shadows.js";
  import { ref } from "vue";
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from "@/stores/auth.js";

  export default {
    setup() {
      let search = ref("");
      const store = useAuthStore();
      const { user } = storeToRefs(store);
      const shadowStore = useShadowsStore();

      function onSideBarClick() {
        shadowStore.setSideBarOpen();
      }

      function onSearchClick() {
        shadowStore.setFilters('all')
        shadowStore.setSearchStr(search.value);
      }

      function logout() {
        store.logout();
        window.location.reload();
        //router.push("cards_list");
      }
      return {logout, user, onSearchClick, search, onSideBarClick}
    },
  };
</script>