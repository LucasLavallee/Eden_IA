import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMode: 'navigate', // 'navigate', 'add', 'remove'
    currentSelection: 'carrot',
    activeWorld: 0,
    currentSpeed: 1,
    currentTime: 0,
    environmentParameters: {
      temperature: 50,
      brightness: 50,
      humidity: 50,
      pollution: 50
    },
    worlds: {
      presentSpecies: {
        "BEET_TREE" : 0,
        "CARROT_TREE": 0,
        "PEPPER_TREE": 0,
        "PUMPKIN_TREE": 0,
        "STRAWBERRY_TREE": 0,
        "TOMATO_TREE": 0,
        "ZUCCHINI_TREE": 0,
        "BANANA_TREE": 0,
        "ORANGE_TREE": 0,
        "PEAR_TREE": 0
      }
      ,
      planted: 0,
      bornNaturally: 0,
      dead: 0
    }
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
    },
    CHANGE_PARAMETER_TEMPERATURE (state, val) {
      state.environmentParameters.temperature = val
    },
    CHANGE_PARAMETER_BRIGHTNESS (state, val) {
      state.environmentParameters.brightness = val
    },
    CHANGE_PARAMETER_HUMIDITY (state, val) {
      state.environmentParameters.humidity = val
    },
    CHANGE_PARAMETER_POLLUTION (state, val) {
      state.environmentParameters.pollution = val
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
    },
    changeTemperature: (store, value) => {
      store.commit('CHANGE_PARAMETER_TEMPERATURE', value)
    },
    changeBrightness: (store, value) => {
      store.commit('CHANGE_PARAMETER_BRIGHTNESS', value)
    },
    changeHumidity: (store, value) => {
      store.commit('CHANGE_PARAMETER_HUMIDITY', value)
    },
    changePollution: (store, value) => {
      store.commit('CHANGE_PARAMETER_POLLUTION', value)
    }
  },
  getters: {
    getCurrentSelection: state => state.currentSelection,
    getCurrentMode: state => state.currentMode,
    getActiveWorld: state => state.activeWorld,
    getCurrentSpeed: state => state.currentSpeed,
    getCurrentTime: state => state.currentTime,
    getTemperature: state => state.environmentParameters.temperature,
    getBrightness: state => state.environmentParameters.brightness,
    getHumidity: state => state.environmentParameters.humidity,
    getPollution: state => state.environmentParameters.pollution,
    getWorldsInfos: state => state.worlds,
    getNumberOfPresentSpecies: (state) => {
      let count = 0
      const presentSpecies = state.worlds.presentSpecies
      for(const specie in presentSpecies) {
        if(presentSpecies[specie] > 0) {
          count++
        }
      }
      return count
    },
    getNumberOfPlanted: state => state.worlds.planted,
    getNumberOfBornNaturally: state => state.worlds.bornNaturally,
    getNumberOfDead: state => state.worlds.dead,
  },
  modules: {
  }
})
