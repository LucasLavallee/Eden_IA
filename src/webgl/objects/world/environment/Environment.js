// import { datGui } from 'utils/debug'
import store from '@/store'
export default class Environment {
  constructor () {
    this.properties = {
      temperature: store.getters.getTemperature,
      humidity: store.getters.getHumidity,
      brightness: store.getters.getBrightness,
      pollution: store.getters.getPollution
    }
  }
  update () {
    this.properties.temperature = store.getters.getTemperature
    this.properties.brightness = store.getters.getBrightness
    this.properties.humidity = store.getters.getHumidity
    this.properties.pollution = store.getters.getPollution
  }
  getProperties () {
    return this.properties
  }
}
