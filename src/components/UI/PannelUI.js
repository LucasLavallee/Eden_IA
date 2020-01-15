import { datGui } from '@/utils/debug'
import store from '@/store'

export default class PannelUI {
  constructor () {
    this.species = {
      species: [
        'carot',
        'banana',
        'tomato',
        'pear'
      ]
    }
    this.controller = null
    this.load()
  }

  load () {
    this.controller = this.addSpeciesGui()
    this.controller.onChange(() => {
      console.log('Nouvelle value: ', this.controller.getValue())
      store.commit('setCurrentSelection', this.controller.getValue())
    })
  }

  addSpeciesGui () {
    const speciesFolder = datGui.addFolder('Species')
    return speciesFolder.add(this.species, 'species', ['carot', 'banana', 'tomato', 'pear'])
  }
}
