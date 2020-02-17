import {
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  Vector3
} from 'three'
import constant from 'utils/constant'
import Bush from '../bushes/Bush'

export default class Carot extends Bush {
  constructor (bornTime = 0, genome, position, bushType) {
    super(bornTime, genome, position, bushType)

    this.spawn()
  }

  spawn () {
    this.height = 3

    const geometry = new BoxGeometry(1, this.height, 1)
    const material = new MeshPhongMaterial({
      color: 0xFF6600,
      emissive: 0xFF6600,
      emissiveIntensity: 0.3
    })
    const cube = new Mesh(geometry, material)

    this.add(cube)

    const geometryLeave = new BoxGeometry(0.5, 1, 0.5)
    const materialLeave = new MeshPhongMaterial({
      color: constant.COLOR.GREEN,
      emissive: constant.COLOR.GREEN,
      emissiveIntensity: 0.3
    })
    const leave = new Mesh(geometryLeave, materialLeave)
    leave.position.y = (this.height / 2) + 0.5

    this.add(leave)

    this.spawnablePosition.push({
      type: 'cube',
      size: new Vector3(0.5, 1, 0.5),
      position: new Vector3(leave.position.x, leave.position.y , leave.position.z)
    })
  }

  deployFruit (time, flower, strongAxis) {
    let vectorPos = new Vector3()
    vectorPos.setFromMatrixPosition(flower.matrixWorld)

    const spawningAngle = Math.random() * Math.PI * 2

    vectorPos.x = (strongAxis === 'x' ? (vectorPos.x - this.height/2) : 3*Math.cos(spawningAngle) + vectorPos.x)
    vectorPos.y = (strongAxis === 'y' ? (vectorPos.y - this.height/2) : 3*Math.sin(spawningAngle) + vectorPos.y)
    vectorPos.z = (strongAxis === 'z' ? (vectorPos.z - this.height/2) : 3*Math.sin(spawningAngle) + vectorPos.z)
    
    const newCarrot = new Carot(time, flower.parentGenome
      , vectorPos, "CARROT")

    this.fruits.push(newCarrot)
    
  }

  updateFruits (dt) {
    const newBushes = []

    for (let i = this.fruits.length; i > 0; i--) {
      const myBush = this.removeFruit(this.fruits[i])
      newBushes.push({
        type: "CARROT_TREE",
        livingBeing: myBush[0]
      })
    }
    return newBushes
  }
}
