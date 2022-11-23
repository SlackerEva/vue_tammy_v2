import { defineStore } from 'pinia';
import auth from '@/api/authApi.js';
import router from '@/router/index';

export const useAuthStore = defineStore('users', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    error: '',
  }),

  actions: {
    authorize(email, password) {
      return auth.authorize(email, password)
        .then((value) => {
          this.user = value.user;
          localStorage.setItem('user', JSON.stringify(this.user));
          if (value.token) {
              localStorage.setItem('token', value.token);
              router.push('/');
              //window.location.reload();
              //return;
          }
        })
        .catch((err)=>{
          console.log(err);
        });
    },
  
    register(email, password) {
      auth.register(email, password)
        .then((res) => {
          if (res.statusCode !== 400){
            router.push('/login');
          }
        })
        .catch((err)=>{
          console.log(err);
        });
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
})