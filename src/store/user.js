import { defineStore } from 'pinia'
const api = 'https://jsonplaceholder.typicode.com/users'
export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    users: [],
  }),
  getters: {
    totalUser: (state) => state.users.length,
  },
  actions: {
    fetchUsers() {
      return this.$fetch.get(api).then((res) => {
        this.users = res.data
      })
    },
  },
})
