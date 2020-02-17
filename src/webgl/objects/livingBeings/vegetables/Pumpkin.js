import Vegetable from './Vegetable'
import constant from 'utils/constant'

import {
  SphereBufferGeometry,
  CatmullRomCurve3,
  TubeBufferGeometry,
  Vector3,
  Mesh,
  MeshPhongMaterial,
  DoubleSide
} from 'three'

export default class Pumpkin extends Vegetable {
  constructor (bornTime = 0, genome, position, parentGenome) {
    super(bornTime, genome, position, parentGenome)

    this.curve = new CatmullRomCurve3([
      new Vector3(-this.genome.size * 3, this.genome.size * 4, 0),
      new Vector3(this.genome.size, this.genome.size * 3, 0),
      new Vector3(0, 0, 0),
      new Vector3(this.genome.size, this.genome.size * -3, 0),
      new Vector3(this.genome.size * 2, this.genome.size * -4, 0)
    ])

    this.init()
  }

  init () {
    // base
    const geometry = new SphereBufferGeometry(this.genome.size, 10, 32)
    // tige
    const tubeGeometry = new TubeBufferGeometry(this.curve, 100, 1, 10, false)
    tubeGeometry.scale(0.15, 0.15, 0.15)

    const material = new MeshPhongMaterial({
      color: 0xFF8100,
      emissive: 0xFF8100,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    const material2 = new MeshPhongMaterial({
      color: constant.COLOR.GREEN,
      emissive: constant.COLOR.GREEN,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    const pumpkin = new Mesh(geometry, material)
    const pumpkin2 = new Mesh(geometry, material)
    const pumpkin3 = new Mesh(geometry, material)
    const pumpkin4 = new Mesh(geometry, material)
    const pumpkin5 = new Mesh(geometry, material)
    const pumpkin6 = new Mesh(geometry, material)
    const tige = new Mesh(tubeGeometry, material2)

    tige.position.set(this.genome.size / 2.5, this.genome.size, this.genome.size / 3)
    pumpkin2.position.set(this.genome.size, 0, 0)
    pumpkin3.position.set(this.genome.size / 2, 0, this.genome.size)
    pumpkin4.position.set(0, 0, this.genome.size)
    pumpkin5.position.set(this.genome.size, 0, this.genome.size / 2)
    pumpkin6.position.set(this.genome.size / 2, 0, this.genome.size / 2)

    this.add(pumpkin, pumpkin2, pumpkin3, pumpkin4, pumpkin5, pumpkin6, tige)
  }
}
