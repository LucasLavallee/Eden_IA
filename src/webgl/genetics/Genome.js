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
  constructor (options = {}, withRange = false, type = 'tree') {

    this.size = options.size ? options.size : 1.0

    if (type !== 'flower') {
      this.temperature = options.temperature ? (withRange ? randomInt(options.temperature[0], options.temperature[1]) : options.temperature) : 10
      this.pollution = options.pollution ? options.pollution : 50
      this.brightness = options.brightness ? (withRange ? randomInt(options.brightness[0], options.brightness[1]) : options.brightness) : 50
      this.humidity = options.humidity ? (withRange ? randomInt(options.humidity[0], options.humidity[1]) : options.humidity) : 50
    }

    this.lifeTime = options.lifeTime ? (withRange ? randomInt(options.lifeTime[0], options.lifeTime[1]) : options.lifeTime) : 150

    switch (type) {
      default: // tree
        this.nbLeaves = options.nbLeaves ? options.nbLeaves : 2
        this.nbFlowers = options.nbFlowers ? (withRange ? randomInt(options.nbFlowers[0], options.nbFlowers[1]) : options.nbFlowers) : 10
        break
    }
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
