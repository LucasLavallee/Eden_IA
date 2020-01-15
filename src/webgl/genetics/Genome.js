// import { Vector3 } from "three"

/** Class Genome
 * Define the caracteristics and the different needs / ideal environmental parameters for each entity
 * Example :
 * pollution = 50 ==> the entity can resist up to a 50/100 level of pollution, more is deadly
 * humidity = 50 ==> the entity need a 50/100 level of water, more can be too much and less might be not enough, deadly if too much
 * etc.
 */

import { randomInt } from 'utils/basicFunction'

class Genome {
  constructor (options = {}/* color = 'blue', size = 1, temperature = 10, pollution = 50, brightness = 50, humidity = 50 */, withRange = false) {
    this.color = options.color ? options.color : 'yellow'
    this.size = options.size ? options.size : 1

    this.temperature = options.temperature ? (withRange ? randomInt(options.temperature[0], options.temperature[1]) : options.temperature) : 10
    this.pollution = options.pollution ? options.pollution : 50
    this.brightness = options.brightness ? (withRange ? randomInt(options.brightness[0], options.brightness[1]) : options.brightness) : 50
    this.humidity = options.humidity ? (withRange ? randomInt(options.humidity[0], options.humidity[1]) : options.humidity) : 50

    this.lifeTime = options.lifeTime ? (withRange ? randomInt(options.lifeTime[0], options.lifeTime[1]) : options.lifeTime) : 200
    this.reproductionRate = options.reproductionRate ? (withRange ? randomInt(options.reproductionRate[0], options.reproductionRate[1]) : options.reproductionRate) : 120
  }

  setSize (size) {
    this.size = size
  }

  setColor (color) {
    this.color = color
  }

  setTemperature (temperature) {
    this.temperature = temperature
  }

  setPollution (pollution) {
    this.pollution = pollution
  }

  setBrightness (brightness) {
    this.brightness = brightness
  }

  setHumidity (humidity) {
    this.humidity = humidity
  }
}

export default Genome
