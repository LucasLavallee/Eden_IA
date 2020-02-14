import Vegetable from './Vegetable'
import constant from 'utils/constant'

import {
  CylinderBufferGeometry,
  CatmullRomCurve3,
  Vector3,
  TubeBufferGeometry,
  Mesh,
  MeshPhongMaterial,
  DoubleSide
} from 'three'

export default class Zucchini extends Vegetable {
  constructor (bornTime = 0, genome, position) {
    super(bornTime, genome, position)

    this.curve = new CatmullRomCurve3([
      new Vector3(0, 0, 0),
      new Vector3(this.genome.size / 2, 0, 0),
      new Vector3(0, this.genome.size / 2, 0),
      new Vector3(this.genome.size, this.genome.size * -5, 0),
      new Vector3(0, 0, 0)
    ])

    this.init()
  }

  init () {
    // base
    const tubeGeometry = new TubeBufferGeometry(this.curve, 100, 1, 10, false)
    tubeGeometry.scale(0.5, 0.5, 0.5)
    // tige
    const geometry = new CylinderBufferGeometry(this.genome.size / 2, this.genome.size / 5, this.genome.size / 2, 32, 32)

    const material = new MeshPhongMaterial({
      color: 0x356100,
      emissive: 0x356100,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    const material2 = new MeshPhongMaterial({
      color: constant.COLOR.GREEN,
      emissive: constant.COLOR.GREEN,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    const zucchini = new Mesh(tubeGeometry, material)
    const tige = new Mesh(geometry, material2)

    zucchini.rotation.set(Math.PI / 2, 0, 0)
    tige.rotation.set(Math.PI / 2, 0, 0)
    tige.position.set(this.genome.size / 2.1, 0, this.genome.size * -2.5)

    this.add(zucchini, tige)
  }

}
