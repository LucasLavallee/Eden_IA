import Bush from './Bush'
import Genome from '../../../genetics/Genome'
import Zucchini from '../vegetables/Zucchini'
import constant from '@/utils/constant'
import { Vector3, BoxBufferGeometry, MeshPhongMaterial, Mesh, Object3D } from 'three'
import { randomFloat, clamp } from 'utils/basicFunction'

export default class ZucchiniBush extends Bush {
  constructor (bornTime, genome, position, bushType) {
    super(bornTime, genome, position, bushType)

    this.spawn()
  }

  spawn () {
    const nbLeaves = this.genome.nbLeaves
    const width = 4
    let currentRot = 0
    for (let i = 0; i < nbLeaves; i++) {
      const branch = new Object3D()
      const geometry = new BoxBufferGeometry(width, 0.1, 0.1)
      geometry.translate(width / 2, 0, 0)
      
      const material = new MeshPhongMaterial({
        color: 0x32a844
      })
      let mesh = new Mesh(geometry, material)
      branch.add(mesh)

      this.spawnablePosition.push({
        type: 'cube',
        size: new Vector3(width, 0.1, 0.1),
        position: mesh.position
      })

      // leaves
      for (let j = 0; j < 3; j++) {
        const leaveGeometry = new BoxBufferGeometry(1.5, 0.1, 1.5)
        leaveGeometry.rotateY(randomFloat(0.0, Math.PI / 2))
        leaveGeometry.translate((width / 3) * (j + 1), 0.3, 0)
        const leaveMaterial = new MeshPhongMaterial({
          color: 0x32a844
        })
        let leaveMesh = new Mesh(leaveGeometry, leaveMaterial)
        branch.add(leaveMesh)
      }

      branch.rotation.set(0, currentRot, Math.PI / 12)

      currentRot += (2 * Math.PI) / nbLeaves
      this.add(branch)
    }
  }

  deployFruit (time, flower) {
    const genomeOptions = { ...constant.DEFAULT_GENOME.ZUCCHINI, lifeTime: [constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.ZUCCHINI_TREE.fruitTimeFactor, constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.ZUCCHINI_TREE.fruitTimeFactor] }

    const newZucchini = new Zucchini(time, new Genome(genomeOptions, true, 'fruit')
      , flower.position, flower.parentGenome)

    this.add(newZucchini)
    this.fruits.push(newZucchini)
  }
  
  createNewBush (dt, position, genome, strongAxis) {

    let vectorPos = new Vector3(position.x, position.y, position.z)

    const spawningAngle = Math.random() * Math.PI * 2
  
    vectorPos.x = strongAxis === 'x' ? (vectorPos.x) : clamp(5*Math.cos(spawningAngle) + vectorPos.x, -constant.GROUND.WIDTH/2, constant.GROUND.WIDTH/2)
    vectorPos.y = strongAxis === 'y' ? (vectorPos.y) : clamp(5*Math.sin(spawningAngle) + vectorPos.y, -constant.GROUND.WIDTH/2, constant.GROUND.WIDTH/2)
    vectorPos.z = strongAxis === 'z' ? (vectorPos.z) : clamp(5*Math.sin(spawningAngle) + vectorPos.z, -constant.GROUND.WIDTH/2, constant.GROUND.WIDTH/2)
   
    return {
      type: 'ZUCCHINI_TREE',
      livingBeing: new ZucchiniBush(dt, genome, vectorPos, 'ZUCCHINI')
    }
  }
}
