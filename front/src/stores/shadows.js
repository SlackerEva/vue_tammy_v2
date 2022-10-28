import { defineStore } from 'pinia'

export const useShadowsStore = defineStore('shadows', {
  state: () => ({
    data: []
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
    getData() {
      fetch("http://localhost:3002/")// заментить на переменную с путем
        .then(res => res.json())
        .then(data => {
          this.data = data;
        });
    }
  },
})