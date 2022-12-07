import { defineStore } from 'pinia';
import shadows from '@/api/shadowsApi.js';
import userShadows from '@/api/userShadowApi.js';

export const useShadowsStore = defineStore('shadows', {
  state: () => ({
    data: [],
    page: 0,
    userShadows:[],
  }),
  getters: {

  },
/*  getters: {
    finishedTodos(state) {
      // autocompletion! ✨
      return state.todos.filter((todo) => todo.isFinished)
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished)
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     
    filteredTodos(state) {
      if (this.filter === 'finished') {
        // call other getters with autocompletion ✨
        return this.finishedTodos
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos
      }
      return this.todos
    },
  },*/
  actions: {
    setPage(page) {
      this.page = page;
    },
    getData() {
      shadows.getShadows(this.page)
        .then((res) => {
          this.data.push(...res)
        });
    },
    //это getter
    find(shadow) {
      return this.userShadows.indexOf(shadow) === -1 ? false : true;
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