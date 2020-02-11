import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMode: 'add', // 'navigate', 'add', 'remove'
    currentSelection: 'carrot',
    activeWorld: 0,
    currentSpeed: 1
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
    changeActiveWorld: (store, id) => {
      store.commit('CHANGE_ACTIVE_WORLD', id)
    },
    changeCurrentSpeed: (store, speed) => {
      store.commit('CHANGE_CURRENT_SPEED', speed)
    }

  },
  getters: {
    getCurrentSelection: state => state.currentSelection,
    getCurrentMode: state => state.currentMode,
    getActiveWorld: state => state.activeWorld,
    getCurrentSpeed: state => state.currentSpeed
  },
  modules: {
  }
})
