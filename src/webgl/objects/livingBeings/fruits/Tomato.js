import Fruit from './Fruit'
import constant from 'utils/constant'

import {
  SphereBufferGeometry,
  CylinderBufferGeometry,
  Shape,
  ShapeBufferGeometry,
  Mesh,
  MeshPhongMaterial,
  DoubleSide
} from 'three'

export default class Tomato extends Fruit {
  constructor (bornTime = 0, genome, position) {
    super(bornTime, genome, position)

    this.init()
  }

  init () {
    const size = 2
    const x = 0; const y = 0

    var leafShape = new Shape()
    var leafShape2 = new Shape()

    leafShape.bezierCurveTo(x + size, y + size, x + size, y, x, y)
    leafShape2.bezierCurveTo(x + size, size, x + size, y, x, y)

    // base
    const geometry = new SphereBufferGeometry(size, 32, 32)
    // tige
    const geometry2 = new CylinderBufferGeometry(size / 16, size / 32, size / 2, 24)
    // feuille
    const geometry3 = new ShapeBufferGeometry(leafShape)
    const geometry4 = new ShapeBufferGeometry(leafShape2)

    // materials
    /* const material = new MeshPhongMaterial({
      color: 0xab0000,
      shininess: 40,
      side: DoubleSide
    }) */

    const material = new MeshPhongMaterial({
      color: this.genome.color,
      emissive: this.genome.color,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    /* const material2 = new MeshPhongMaterial({
      color: 0x009000,
      shininess: 40,
      side: DoubleSide
    }) */

    const material2 = new MeshPhongMaterial({
      color: constant.COLOR.GREEN,
      emissive: constant.COLOR.GREEN,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    const tomato = new Mesh(geometry, material)
    const tige = new Mesh(geometry2, material2)
    const leaf = new Mesh(geometry3, material2)
    const leaf2 = new Mesh(geometry4, material2)

    /* positionnement de la tige et de la feuille
    par rapport à la base */
    tige.position.set(0, size, 0)
    leaf.position.set(0, size, 0.03)
    leaf2.position.set(0, size, 0.03)
    leaf.rotation.set(30, 10, 0)
    leaf2.rotation.set(20, 0, 0)

    this.add(tomato, tige, leaf, leaf2)
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
