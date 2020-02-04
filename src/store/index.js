import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMode: 'add', // 'navigate', 'add', 'remove'
    currentSelection: 'carot',
    currentTime: ""
  },
  mutations: {
    CHANGE_CURRENT_MODE (state, val) {
      state.currentMode = val
    },
    CHANGE_CURRENT_SELECTION (state, val) {
      state.currentSelection = val
    },
    CHANGE_TIME (state, val) {
      state.currentTime = val
    }
  },
  actions: {
    changeCurrentMode: (store, mode) => {
      store.commit('CHANGE_CURRENT_MODE', mode)
    },
    changeCurrentSelection: (store, selection) => {
      store.commit('CHANGE_CURRENT_SELECTION', selection)
    },
    changeTime: (store, time) => {
      store.commit('CHANGE_TIME', time)
    }

  },
  getters: {
    getCurrentSelection: state => state.currentSelection,
    getCurrentMode: state => state.currentMode,
    getTime: state => state.currentTime
  },
  modules: {
  }
})
