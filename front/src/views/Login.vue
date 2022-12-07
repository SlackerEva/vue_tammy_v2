<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <div 
      v-if="error"
      class="mb-10 p-4 rounded-md bg-light-grey shadow-lg"
    >
      <p class="text-red-500">
        {{ error }}
      </p>
    </div>
    <!--   -->
    <form
      @submit.prevent="onSubmit"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-light-green mb-4">
        Вход
      </h1>

      <div class="flex flex-col mb-2">
        <label 
          for="email" 
          class="mb-1 text-light-green"
        >
          Почта
        </label>
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="email"
          v-model="email"
        /><!--  -->
      </div>

      <div class="flex flex-col mb-2">
        <label 
          for="password" 
          class="mb-1 text-light-green"
        >
          Пароль
        </label>
        <input
          type="password"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="password"
          v-model="password"
        /><!--  -->
      </div>

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm 
        text-white bg-light-green duration-500 
        border-solid border-2 border-transparent 
        hover:border-light-green hover:bg-white hover:text-light-green"
      >
        Войти
      </button>

      <router-link class="mt-6 text-center" :to="{ name: 'user_register' }">
        У вас нет аккаунта? 
        <span class="text-light-green">
          Зарегестрироваться
        </span>
      </router-link>
      <router-link class="mt-6 text-center" :to="{ name: 'user_forgotten-pass' }">
        <span class="text-light-green">
          Забыли пароль?
        </span>
      </router-link>
    </form>
  </div>
</template>

<script>
  import { ref } from "vue";
  import { useAuthStore } from "@/stores/auth.js";
  import { storeToRefs } from 'pinia';

  export default {
    name: "user_login",
    setup() {
      const store = useAuthStore();
      const email = ref(null);
      const password = ref(null);
      const { error} = storeToRefs(store);

      const onSubmit = () => {
        store.authorize(email.value, password.value);
      }
      return { email, password, error, onSubmit};
    },
  };
</script>