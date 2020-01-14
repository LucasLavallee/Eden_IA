import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMode: 'add', // 'navigate', 'add', 'remove'
    currentSelection: 'carot'
  },
  mutations: {
    CHANGE_CURRENT_MODE (state, val) {
      state.currentMode = val
    }
  },
  actions: {
    changeCurrentMode: (store, mode) => {
      store.commit('CHANGE_CURRENT_MODE', mode)
    }
  },
  getters: {
    getCurrentSelection: state => state.currentSelection,
    getCurrentMode: state => state.currentMode
  },
  modules: {
  }
})
