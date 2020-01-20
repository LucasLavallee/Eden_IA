import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMode: 'add', // 'navigate', 'add', 'remove'
    currentSelection: 'carot',
    activeWorld: 0
  },
  mutations: {
    CHANGE_CURRENT_MODE (state, val) {
      state.currentMode = val
    },
    CHANGE_CURRENT_SELECTION (state, val) {
      state.currentSelection = val
    },
    CHANGE_ACTIVE_WORLD (state, val) {
      state.activeWorld = val
    }
  },
  actions: {
    changeCurrentMode: (store, mode) => {
      store.commit('CHANGE_CURRENT_MODE', mode)
    },
    changeCurrentSelection: (store, selection) => {
      store.commit('CHANGE_CURRENT_SELECTION', selection)
    },
    changeActiveWorld: (store, id) => {
      store.commit('CHANGE_ACTIVE_WORLD', id)
    }

  },
  getters: {
    getCurrentSelection: state => state.currentSelection,
    getCurrentMode: state => state.currentMode,
    getActiveWorld: state => state.activeWorld
  },
  modules: {
  }
})
