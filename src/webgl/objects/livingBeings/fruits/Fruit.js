import LivingBeings from '../LivingBeings'

export default class Fruit extends LivingBeings {
  constructor (bornTime = 0, genome, position, parentGenome) {
    super(bornTime, genome, position)
    this.parentGenome = parentGenome
    this.fallingTime = 10
  }

  fall () {
    this.position.set(this.position.x, 0, this.position.z)
  }

  update (dt) {
    const age = dt - this.bornTime

    if (age < this.lifeTime) {
      let scale = age / (this.lifeTime / 3)
      scale = scale <= 1 ? scale : 1
      this.scale.set(scale, scale, scale)

      if (this.lifeTime - this.fallingTime < age) {
        this.fall()
      }
    } else {
      this.die()
    }
  }
}
