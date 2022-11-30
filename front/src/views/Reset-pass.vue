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
        Сброс пароля
      </h1>

      <div class="flex flex-col mb-2">
        <label 
          for="password" 
          class="mb-1 text-light-green"
        >
          Новый пароль
        </label>
        <input
          type="password"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="password"
          v-model="password"
        />
      </div><!--  -->

      <div class="flex flex-col mb-2">
        <label 
          for="confirmPassword" 
          class="mb-1 text-light-green"
        >
          Подтвердите пароль
        </label>
        <input
          type="password"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="confirmPassword"
          v-model="confirmPassword"
        />
      </div><!--  -->

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm
        text-white bg-light-green duration-500 
        border-solid border-2 border-transparent 
        hover:border-light-green hover:bg-white hover:text-light-green"
      >
        Сбросить пароль
      </button>

      <router-link class="mt-6 text-center" :to="{ name: 'user_login' }">
        <span class="text-light-green">
          Вход
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
    name: "user_reset-pass",
    props: {
      id: String,
      token: String
    },
    setup(props) {
      const store = useAuthStore();
      //const email = ref(null);
      const password = ref(null);
      const confirmPassword = ref(null);
      const { error } = storeToRefs(store);
      const onSubmit = () => {
        if (password.value === confirmPassword.value) {
          const store = useAuthStore();
          store.reset(password.value, props.id, props.token);
        } else {
          store.error = 'Пароли не совпадают';
        }
      }

    return { password, confirmPassword, error, onSubmit };
    },
  };
</script>