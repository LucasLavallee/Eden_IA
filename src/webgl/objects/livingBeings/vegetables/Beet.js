import constant from 'utils/constant'

import {
  CylinderBufferGeometry,
  ConeBufferGeometry,
  SphereBufferGeometry,
  Shape,
  ShapeBufferGeometry,
  Mesh,
  MeshPhongMaterial,
  DoubleSide
} from 'three'
import Bush from '../bushes/Bush'

export default class Beet extends Bush {
  constructor (bornTime = 0, genome, position, bushType) {
    super(bornTime, genome, position, bushType)

    this.spawn()
  }

  spawn () {
    const x = 0
    const y = 0

    var leafShape = new Shape()

    leafShape.bezierCurveTo(x + this.genome.size, y + this.genome.size, x + this.genome.size, y, x, y)

    // base
    const geometry = new ConeBufferGeometry(this.genome.size / 2, this.genome.size / 2, 32)
    const geometry2 = new SphereBufferGeometry(this.genome.size, 32, 32)
    // tige
    const geometry3 = new CylinderBufferGeometry(this.genome.size / 10, this.genome.size / 10, this.genome.size * 2, 32, 32)
    // feuille
    const geometry4 = new ShapeBufferGeometry(leafShape)
    geometry4.scale(2.5, 2.5, 2.5)

    const material = new MeshPhongMaterial({
      color: 0x7F023D,
      emissive: 0x7F023D,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    const material2 = new MeshPhongMaterial({
      color: constant.COLOR.GREEN,
      emissive: constant.COLOR.GREEN,
      emissiveIntensity: 0.3,
      side: DoubleSide
    })

    const beetUp = new Mesh(geometry, material)
    const beetDown = new Mesh(geometry2, material)
    const tige = new Mesh(geometry3, material2)
    const tige2 = new Mesh(geometry3, material2)
    const tige3 = new Mesh(geometry3, material2)
    const leaf = new Mesh(geometry4, material2)
    const leaf2 = new Mesh(geometry4, material2)
    const leaf3 = new Mesh(geometry4, material2)

    beetUp.rotation.set(Math.PI, 0, 0)
    beetDown.position.set(0, this.genome.size + 0.07, 0)
    tige.position.set(0, this.genome.size * 3, 0)
    tige2.position.set(0, this.genome.size * 3, this.genome.size / 2)
    tige2.rotation.set(Math.PI / 8, 0, 0)
    tige3.position.set(0, this.genome.size * 3, -this.genome.size / 2)
    tige3.rotation.set(-Math.PI / 8, 0, 0)
    leaf.position.set(0, this.genome.size * 3, this.genome.size / 2)
    leaf.rotation.set(Math.PI / -2, Math.PI / 2, Math.PI)
    leaf2.position.set(0, this.genome.size * 3, -this.genome.size / 2)
    leaf2.rotation.set(Math.PI / -2, Math.PI / 2, Math.PI / 2)
    leaf3.position.set(0, this.genome.size * 3, 0)
    leaf3.rotation.set(Math.PI / 2, Math.PI / 2, 0)

    this.add(beetUp, beetDown, tige, tige2, tige3, leaf, leaf2, leaf3)
  }

  deployFruit (time, flower, strongAxis) {
    let vectorPos = new Vector3()
    vectorPos.setFromMatrixPosition(flower.matrixWorld)

    const spawningAngle = Math.random() * Math.PI * 2

    vectorPos.x = (strongAxis === 'x' ? (vectorPos.x - this.height/2) : 3*Math.cos(spawningAngle) + vectorPos.x)
    vectorPos.y = (strongAxis === 'y' ? (vectorPos.y - this.height/2) : 3*Math.sin(spawningAngle) + vectorPos.y)
    vectorPos.z = (strongAxis === 'z' ? (vectorPos.z - this.height/2) : 3*Math.sin(spawningAngle) + vectorPos.z)
    
    const newBeet = new Beet(time, flower.parentGenome
      , vectorPos, "BEET")

    this.fruits.push(newBeet)
    
  }

  updateFruits (dt) {
    const newBushes = []

    for (let i = this.fruits.length; i > 0; i--) {
      const myBush = this.removeFruit(this.fruits[i])
      newBushes.push({
        type: "BEET_TREE",
        livingBeing: myBush[0]
      })
    }
    return newBushes
  }
}
