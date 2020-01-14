import Vegetable from './Vegetable'

import {
  BoxGeometry,
  MeshPhongMaterial,
  Mesh
} from 'three'
import constant from 'utils/constant'

export default class Carot extends Vegetable {
  constructor (bornTime = 0, genome, position) {
    super(bornTime, genome, position)

    this.init()
  }

  init () {
    const height = 3

    const geometry = new BoxGeometry(1, height, 1)
    const material = new MeshPhongMaterial({
      color: this.genome.color,
      emissive: this.genome.color,
      emissiveIntensity: 0.3
    })
    const cube = new Mesh(geometry, material)

    this.add(cube)

    const geometryLeave = new BoxGeometry(0.5, 1, 0.5)
    const materialLeave = new MeshPhongMaterial({
      color: constant.COLOR.GREEN,
      emissive: constant.COLOR.GREEN,
      emissiveIntensity: 0.3
    })
    const leave = new Mesh(geometryLeave, materialLeave)
    leave.position.y = (height / 2) + 0.5

    this.add(leave)
  }

  update (dt) {
    const age = dt - this.bornTime

    this.updateReproduction(dt)
    if (age < this.lifeTime) {
      let scale = age / (this.lifeTime / 2)
      scale = scale <= 1 ? scale : 1
      this.scale.set(scale, scale, scale)
    } else {
      this.die()
    }
  }
}
