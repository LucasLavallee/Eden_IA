import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMode: 'add', // 'navigate', 'add', 'remove'
    currentSelection: 'carot'
  },
  mutations: {
    setCurrentSelection: (state, newSelection) => {
      state.currentSelection = newSelection
    }
  },
  actions: {
    setCurrentSelection: ({ commit }, newSelection) => {
      commit('setCurrentSelection', newSelection)
    }

  },
  getters: {
    getCurrentSelection: state => state.currentSelection,
    getCurrentMode: state => state.currentMode
  },
  modules: {
  }
})