import Vegetable from './Vegetable'
import constant from 'utils/constant'

import {
  CylinderBufferGeometry,
  CatmullRomCurve3,
  TubeBufferGeometry,
  Vector3,
  Mesh,
  MeshPhongMaterial,
  DoubleSide
} from 'three'

export default class Pepper extends Vegetable {
  constructor (bornTime = 0, genome, position) {
    super(bornTime, genome, position)

    this.curve = new CatmullRomCurve3([
      new Vector3(-this.genome.size * 2, this.genome.size * 4, 0),
      new Vector3(this.genome.size, this.genome.size * 3, 0),
      new Vector3(0, 0, 0),
      new Vector3(this.genome.size, this.genome.size * -3, 0),
      new Vector3(this.genome.size * 2, this.genome.size * -4, 0)
    ])

    this.init()
  }

  init () {
    // base
    const geometry = new CylinderBufferGeometry(this.genome.size / 2, this.genome.size / 4, this.genome.size * 2, 32, 32)
    // tige
    const tubeGeometry = new TubeBufferGeometry(this.curve, 100, 1, 10, false)
    tubeGeometry.scale(0.15, 0.15, 0.15)

    const material = new MeshPhongMaterial({
      color: 0xFFA700,
      emissive: 0xFFA700,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    const material2 = new MeshPhongMaterial({
      color: constant.COLOR.GREEN,
      emissive: constant.COLOR.GREEN,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    const pepper = new Mesh(geometry, material)
    const pepper2 = new Mesh(geometry, material)
    const pepper3 = new Mesh(geometry, material)
    const pepper4 = new Mesh(geometry, material)
    const tige = new Mesh(tubeGeometry, material2)

    tige.position.set(this.genome.size / 4, this.genome.size, this.genome.size / 4)
    pepper2.position.set(this.genome.size / 2, 0, 0)
    pepper3.position.set(this.genome.size / 2, 0, this.genome.size / 2)
    pepper4.position.set(0, 0, this.genome.size / 2)

    this.add(pepper, pepper2, pepper3, pepper4, tige)
  }

}
