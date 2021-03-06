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

export default class Pear extends Fruit {
  constructor (bornTime = 0, genome, position, parentGenome) {
    super(bornTime, genome, position, parentGenome)

    this.init()
  }

  init () {
    const x = 0; const y = 0
    // const size = 0.3
    var leafShape = new Shape()

    leafShape.bezierCurveTo(x + this.genome.size * 2, y + this.genome.size * 2, x + this.genome.size * 2, y, x, y)

    // base part 1
    var geometry = new CylinderBufferGeometry(this.genome.size * 0.2, this.genome.size * 2, this.genome.size * 2.5, 24, 32)
    // base part 2
    var geometry2 = new SphereBufferGeometry(this.genome.size * 2.25, 32, 32)
    // tige
    var geometry3 = new CylinderBufferGeometry(this.genome.size / 6, this.genome.size / 6, this.genome.size * 1.5, 24, 32)
    // feuille
    var geometry4 = new ShapeBufferGeometry(leafShape)

    // materials
    /* const material = new MeshPhongMaterial({
      color: 0xdadc35,
      shininess: 40,
      side: DoubleSide
    }) */

    const material = new MeshPhongMaterial({
      color: 0xdadc35,
      emissive: 0xdadc35,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    /* const material2 = new MeshPhongMaterial({
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
    tige.position.set(0, this.genome.size + 1, 0)
    leaf.position.set(0, this.genome.size + 1.5, 0)
    base.position.set(0, -this.genome.size * 2.2, 0)

    this.add(pear, base, tige, leaf)
  }
}
