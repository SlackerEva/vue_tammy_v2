import { defineStore } from 'pinia';
import auth from '@/api/authApi.js';
import router from '@/router/index';
export const useAuthStore = defineStore('users', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    token:'',
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
              router.push("/");
              //location.reload(true);
          }
        })
        .catch((err)=>{
          this.error = err;
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
          this.error = err;
        });
    },

    forgotten(email) {
      auth.forgotten(email)
        .then((res) => {
          if (res.statusCode !== 400){
            router.push('/login');
          }
        })
        .catch((err)=>{
          this.error = err;
        });
    },

    reset(password, id, token) {
      auth.reset(password, id, token)
        .then((res) => {
          if (res.statusCode !== 400){
            router.push('/login');
          }
        })
        .catch((err)=>{
          this.error = err;
        });
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push("/");
    }
  },
})