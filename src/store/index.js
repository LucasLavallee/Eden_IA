import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMode: 'add', // 'navigate', 'add', 'remove'
    currentSelection: 'carot',
    currentSpeed: 1
  },
  mutations: {
    CHANGE_CURRENT_MODE (state, val) {
      state.currentMode = val
    },
    CHANGE_CURRENT_SELECTION (state, val) {
      state.currentSelection = val
    },
    CHANGE_CURRENT_SPEED (state, val) {
      state.currentSpeed = val
    }
  },
  actions: {
    changeCurrentMode: (store, mode) => {
      store.commit('CHANGE_CURRENT_MODE', mode)
    },
    changeCurrentSelection: (store, selection) => {
      store.commit('CHANGE_CURRENT_SELECTION', selection)
    },
    changeCurrentSpeed: (store, speed) => {
      store.commit('CHANGE_CURRENT_SPEED', speed)
    }

  },
  getters: {
    getCurrentSelection: state => state.currentSelection,
    getCurrentMode: state => state.currentMode,
    getCurrentSpeed: state => state.currentSpeed
  },
  modules: {
  }
})
