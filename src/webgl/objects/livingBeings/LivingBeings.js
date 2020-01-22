import { Object3D } from 'three'
import Genome from '../../genetics/Genome'

export default class LivingBeings extends Object3D {
  constructor (bornTime = 0, genome, position) {
    super()

    this.bornTime = bornTime
    this.position.set(position.x, position.y, position.z)
    this.alive = true

    // this.lastReproduction = bornTime
    // this.reproductionReady = false

    if (genome === null) {
      this.genome = new Genome()
    } else {
      this.genome = genome
    }

    this.lifeTime = this.genome.lifeTime

    this.setScale(this.genome.size)
  }

  setScale (scale) {
    this.scale.set(scale, scale, scale)
    this.genome.setSize(scale)
  }

  update () {
    this.setScale(this.genome.size)
  }

  die () {
    this.alive = false
  }

  isAlive () {
    return this.alive
  }
}
