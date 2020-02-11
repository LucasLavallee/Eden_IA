import Fruit from './Fruit'
import { degRadian } from 'utils/basicFunction'

import {
  Mesh,
  MeshBasicMaterial,
  CatmullRomCurve3,
  Vector3,
  TubeBufferGeometry,
  ConeBufferGeometry
} from 'three'

class Banana extends Fruit {
  constructor (bornTime = 0, genome, position) {
    super(bornTime, genome, position)

    // Banana neutral shape
    this.curve = new CatmullRomCurve3([
      new Vector3(2, 4, 0),
      new Vector3(1, 3, 0),
      new Vector3(0, 0, 0),
      new Vector3(1, -3, 0),
      new Vector3(2, -4, 0)
    ])

    this.material = new MeshBasicMaterial({ color: this.genome.color })

    this.init()
  }

  init () {
    // Body
    const tubeGeometry = new TubeBufferGeometry(this.curve, 100, 1, 10, false)
    tubeGeometry.scale(0.2, 0.2, 0.2)
    this.body = new Mesh(tubeGeometry, this.material)
    this.add(this.body)

    // Top extremity
    const firstExtremityGeometry = new ConeBufferGeometry(2, 5, 32)
    firstExtremityGeometry.scale(0.1, 0.1, 0.1)
    this.cone = new Mesh(firstExtremityGeometry, this.material)
    this.cone.translateX(0.59)
    this.cone.translateY(0.95)
    this.cone.rotateZ(degRadian(-50))
    this.add(this.cone)

    // Bottom extremity

    const secondExtremityGeometry = new ConeBufferGeometry(2, 5, 32)
    secondExtremityGeometry.scale(0.1, 0.1, 0.1)
    this.cone2 = new Mesh(secondExtremityGeometry, this.material)
    this.cone2.translateX(0.59)
    this.cone2.translateY(-0.9)
    this.cone2.rotateZ(degRadian(-122))
    this.add(this.cone2)
  }

}

export default Banana
