import { defineStore } from 'pinia';
import shadows from '@/api/shadowsApi.js';
import userShadows from '@/api/userShadowApi.js';

export const useShadowsStore = defineStore('shadows', {
  state: () => ({
    shadows: [],
    page: 0,
    userShadows:[],
  }),
  getters: {
    //это геттер потому что мы осуществляем поиск и ничего не меняем в стейте
    getShadowById: (state) => {
      return (shadowId) => state.userShadows.indexOf(shadowId) === -1 ? false : true;
    }
  },
  actions: {
    setPage(page) {
      this.page = page;
    },
    getShadows() {
      shadows.getShadows(this.page)
        .then((res) => {
          this.shadows.push(...res)
        });
    },
    removeShadows() {
      this.shadows = [];
    },
    getUserShadows() {
      userShadows.getUserShadows()
        .then((res) => {
          const shadowArr = res.map((obj) => {
            return obj.shadow;
          })
          this.userShadows.push(...shadowArr);
        });
    }
  },
})