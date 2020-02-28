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

export default class Orange extends Fruit {
  constructor (bornTime = 0, genome, position, parentGenome) {
    super(bornTime, genome, position, parentGenome)

    this.init()
  }

  init () {
    const x = 0
    const y = 0

    var leafShape = new Shape()

    leafShape.bezierCurveTo(x + this.genome.size, y + this.genome.size, x + this.genome.size, y, x, y)

    // base
    const geometry = new SphereBufferGeometry(this.genome.size, 32, 32)
    // tige
    const geometry2 = new CylinderBufferGeometry(this.genome.size / 16, this.genome.size / 32, this.genome.size / 2, 24)
    // feuille
    const geometry3 = new ShapeBufferGeometry(leafShape)

    const material = new MeshPhongMaterial({
      color: 0xff8b00,
      emissive: 0xff8b00,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    const material2 = new MeshPhongMaterial({
      color: constant.COLOR.GREEN,
      emissive: constant.COLOR.GREEN,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    const orange = new Mesh(geometry, material)
    const tige = new Mesh(geometry2, material2)
    const leaf = new Mesh(geometry3, material2)

    /* positionnement de la tige et de la feuille
    par rapport à la base */
    tige.position.set(0, this.genome.size, 0)
    // leaf.position.set(0, size, 0.03)
    leaf.position.set(0, this.genome.size + this.genome.size / 4, 0.03)
    // leaf.rotation.set(30, 10, 0)
    leaf.rotation.set(Math.PI / -2, Math.PI / 2, Math.PI)

    this.add(orange, tige, leaf)
  }
}
