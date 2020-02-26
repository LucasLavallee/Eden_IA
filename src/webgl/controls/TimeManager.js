import store from '@/store'
import constant from 'utils/constant.js'

export default class TimeManager {
  constructor () {
    this.milliseconds = 0
    this.seconds = Math.floor(this.milliseconds / 1000)
    this.minutes = Math.floor(this.seconds / 60)
    this.hours = Math.floor(this.minutes / 60)
    this.days = Math.floor(this.hours / 24)
    this.speed = 1000 // The lower the faster

    this.timeId = setInterval(() => {
      this.update()
    }, 1000)
  }

  getSeconds () {
    if (this.seconds < 10) {
      return '0' + this.seconds
    } else
    if (this.seconds < 60) { return this.seconds } else
    if (this.seconds - (this.minutes * 60) < 10) {
      return '0' + (this.seconds - (this.minutes * 60))
    } else { return this.seconds - (this.minutes * 60) }
  }

  getMinutes () {
    if (this.minutes < 10) {
      return '0' + this.minutes
    } else {
      if (this.minutes < 60) {
        return this.minutes
      } else {
        if (this.minutes - (this.hours * 60) < 10) {
          return '0' + (this.minutes - (this.hours * 60))
        } else {
          return this.minutes - (this.hours * 60)
        }
      }
    }

  }
  

  getHours () {
    if (this.hours < 10) {
      return '0' + this.hours
    } else
    if (this.hours < 24) { return this.hours } else
    if (this.hours - (this.days * 24) < 10) {
      return '0' + (this.hours - (this.days * 24))
    } else { return this.hours - (this.days * 24) }
  }

  print () {
    return (this.getHours() + ':' + this.getMinutes() + ':' + this.getSeconds())
    // console.log(this.milliseconds / constant.TIME_INFOS.YEAR_TIME)
    // return ("Année: " + store.state.currentTime / constant.TIME_INFOS.YEAR_TIME)
  }

  setSpeed (speed) {
    this.speed = speed
  }

  getSpeed () {
    return this.speed
  }

  changeSpeed () {
    clearInterval(this.timeId)
    this.timeId = setInterval(() => {
      this.update()
    }, 1000)
  }

  update () {
    this.milliseconds += 1000
    this.seconds = Math.floor(this.milliseconds / 1000)
    this.minutes = Math.floor(this.seconds / 60)
    this.hours = Math.floor(this.minutes / 60)
    this.days = Math.floor(this.hours / 24)
  }
}
