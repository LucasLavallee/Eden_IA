import Fruit from './Fruit'
import constant from 'utils/constant'

import {
  SphereBufferGeometry,
  CylinderBufferGeometry,
  Shape,
  ShapeBufferGeometry,
  Mesh,
  MeshPhongMaterial,
  DoubleSide,
} from 'three'

export default class Pear extends Fruit {
  constructor (bornTime = 0, genome, position) {
    super(bornTime, genome, position)

    this.init()
  }

  init () {
    const x = 0; const y = 0
    const size = 2
    var leafShape = new Shape()

    leafShape.bezierCurveTo(x + size * 2, y + size * 2, x + size * 2, y, x, y)

    // base part 1
    var geometry = new CylinderBufferGeometry(size * 0.2, size * 2, size * 2.5, 24, 32)
    // base part 2
    var geometry2 = new SphereBufferGeometry(size * 2.25, 32, 32)
    // tige
    var geometry3 = new CylinderBufferGeometry(size / 6, size / 6, size * 1.5, 24, 32)
    // feuille
    var geometry4 = new ShapeBufferGeometry(leafShape)

    // materials
    /* const material = new MeshPhongMaterial({
      color: 0xdadc35,
      shininess: 40,
      side: DoubleSide
    }) */

    const material = new MeshPhongMaterial({
      color: this.genome.color,
      emissive: this.genome.color,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    /*const material2 = new MeshPhongMaterial({
      color: 0x977046,
      shininess: 40,
      side: DoubleSide
    }) */

    const material2 = new MeshPhongMaterial({
      color: constant.COLOR.GREEN,
      emissive: constant.COLOR.GREEN,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    const pear = new Mesh(geometry, material)
    const base = new Mesh(geometry2, material)
    const tige = new Mesh(geometry3, material2)
    const leaf = new Mesh(geometry4, material2)

    /* positionnement de la tige et de la feuille
    par rapport à la base */
    tige.position.set(0, size + 1, 0)
    leaf.position.set(0, size + 1.5, 0.5)
    base.position.set(0, -size * 2.2, 0)

    this.add(pear, base, tige, leaf)
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
