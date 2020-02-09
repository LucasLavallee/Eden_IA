import Fruit from './Fruit'
import constant from 'utils/constant'

import {
  ConeBufferGeometry,
  CylinderBufferGeometry,
  Shape,
  ShapeBufferGeometry,
  Mesh,
  MeshPhongMaterial,
  DoubleSide
} from 'three'

export default class Strawberry extends Fruit {
  constructor (bornTime = 0, genome, position) {
    super(bornTime, genome, position)

    this.init()
  }

  init () {
    const x = 0
    const y = 0
    var leafShape = new Shape()

    leafShape.bezierCurveTo(x + this.genome.size + 0.5, y + this.genome.size + 0.5, x + this.genome.size + 0.5, y, x, y)

    // base
    var geometry = new ConeBufferGeometry(this.genome.size, this.genome.size * 2, 32)
    // tige
    var geometry2 = new CylinderBufferGeometry(this.genome.size / 10, this.genome.size / 4, this.genome.size / 2, 32)
    // feuille
    var geometry3 = new ShapeBufferGeometry(leafShape)

    // materials
    const material = new MeshPhongMaterial({
      color: this.genome.color,
      emissive: this.genome.color,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    const material2 = new MeshPhongMaterial({
      color: constant.COLOR.GREEN,
      emissive: constant.COLOR.GREEN,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    const strawberry = new Mesh(geometry, material)
    const tige = new Mesh(geometry2, material2)
    const leaf = new Mesh(geometry3, material2)
    const leaf2 = new Mesh(geometry3, material2)

    /* positionnement de la tige et de la feuille
    par rapport à la base */
    tige.position.set(0, this.genome.size, 0)
    leaf.position.set(0, this.genome.size, 0)
    leaf2.position.set(0, this.genome.size, 0)
    strawberry.rotation.set(0, 0, Math.PI)
    leaf.rotation.set(Math.PI / 2, this.genome.size / 4, 0)
    leaf2.rotation.set(Math.PI / 2, 0, Math.PI)

    this.add(strawberry, tige, leaf, leaf2)
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
