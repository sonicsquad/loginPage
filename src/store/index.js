import { createStore } from 'vuex'

export default createStore({
  state: {
    userdata: null
  },
  getters: {
  },
  mutations: {
    SET_LOGIN(state, payload){
      state.userdata = payload
    }
  },
  actions: {

  },
  modules: {
     
  }
})
