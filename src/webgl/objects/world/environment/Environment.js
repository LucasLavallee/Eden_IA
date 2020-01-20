// import { datGui } from 'utils/debug'

export default class Environment {
  constructor () {
    this.properties = {
      temperature: 15,
      humidity: 50,
      brightness: 50,
      pollution: 0
    }

    // this.addEnvironmentGui()
  }

  init () {

  }

  // addEnvironmentGui () {
  //   const environmentFolder = datGui.addFolder('Environment properties')
  //   environmentFolder.add(this.properties, 'temperature').min(0).max(40).step(1)
  //   environmentFolder.add(this.properties, 'humidity').min(0).max(100).step(1)
  //   environmentFolder.add(this.properties, 'brightness').min(0).max(100).step(1)
  //   environmentFolder.add(this.properties, 'pollution').min(0).max(100).step(1)
  // }

  getProperties () {
    return this.properties
  }
}
