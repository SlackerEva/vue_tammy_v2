<template>
  <header class="bg-light-green text-white">
    <nav class="py-5 px-5 md:px-14 flex flex-col sm:flex-row gap-4 items-center">
      <button v-if="user" @click="onClick">
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
          @click="searchedList"
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
          Login
        </router-link>
        <li v-if="user" @click="logout" class="cursor-pointer">
          Logout
        </li>
      </ul> 
    </nav>
  </header>
</template>

<script>
  // import store from "@/store/store.js";
  // import { ref } from "vue";
  // import { computed } from "vue";
  // import { supabase } from "../supabase/init";
  // import { useRouter } from "vue-router";
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from "@/stores/auth.js";

  export default {
    setup() {
  //     let search = ref("");
  //     // Get user from store
  //     const user = computed(() => store.state.user);
  //     const filteredData = computed(() => store.state.filteredData);
  //     const data = computed(() => store.state.data);
  //     // Setup ref to router
  //     const router = useRouter();
  //     const isOpen = ref(false);

  //     const onClick = () => { 
  //       store.methods.setOpenDrawer(!isOpen.value);
  //       isOpen.value = !isOpen.value
  //     };

  //     function searchedList() {
  //       store.methods.setFilteredData(data.value.filter((data) => {
  //         return data.name.toLowerCase().includes(search.value.toLowerCase()) ||
  //         data.nameEn.toLowerCase().includes(search.value.toLowerCase())
  //       }));
  //     }
      const store = useAuthStore();
      const { user } = storeToRefs(store);
      console.log(user);
      function logout() {
        store.logout();
        router.push({ name: "cards_list" });
      }
      return {logout, user}
      //return { logout, user, filteredData, data, isOpen, onClick, search, searchedList };
    },
  };
</script>