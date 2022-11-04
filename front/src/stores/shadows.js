import { defineStore } from 'pinia'

export const useShadowsStore = defineStore('shadows', {
  state: () => ({
    data: [],
    page: 0,
  }),
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
      const token = localStorage.getItem('token');
      const APISettings = {
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }),
    }
      // заментить на переменную с путем
      let url = ('http://localhost:3002/?' + new URLSearchParams({ page: this.page }).toString());
      fetch(url, {
        method: 'GET',
        headers: APISettings.headers
      })
        .then(res => res.json())
        .then(data => {
          this.data.push(...data);
        });
    }
  },
})