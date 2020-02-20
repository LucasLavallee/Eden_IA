import Bush from './Bush'
import Genome from '../../../genetics/Genome'
import Strawberry from '../fruits/Strawberry'
import constant from '@/utils/constant'
import { Vector3, BoxBufferGeometry, MeshPhongMaterial, Mesh, Object3D } from 'three'
import { randomInt, randomFloat } from 'utils/basicFunction'

export default class StrawberryBush extends Bush {
  constructor (bornTime, genome, position, bushType) {
    super(bornTime, genome, position, bushType)

    this.spawn()
  }

  spawn () {
    const height = 2
    const geometry = new BoxBufferGeometry(height, height, height)
    geometry.translate(0, height / 2, 0)
    const material = new MeshPhongMaterial({
      color: 0x32a844
    })

    const mesh = new Mesh(geometry, material)
    this.add(mesh)
    
    this.spawnablePosition.push({
      type: 'cube',
      size: new Vector3(height, height, height),
      position: new Vector3(mesh.position.x, mesh.position.y + height / 2, mesh.position.z)
    })

    for (let i = 0; i < this.genome.nbLeaves; i++) {
      const randSize = randomFloat(height/3, height)
      const randFace = randomInt(0,2) === 1
      const leaveGeometry = new BoxBufferGeometry(randSize,randSize,randSize)
      leaveGeometry.translate(randFace ? height/2 + randSize/2 : 0, randSize/2, randFace ? 0 : height/2 + randSize/2)
      const leaveMaterial = new MeshPhongMaterial({
        color: 0x32a844
      })
      let leaveMesh = new Mesh(leaveGeometry, leaveMaterial)
      this.add(leaveMesh)
    }
  }

  deployFruit (time, flower) {
    const genomeOptions = { ...constant.DEFAULT_GENOME.STRAWBERRY, lifeTime: [constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.STRAWBERRY_TREE.fruitTimeFactor, constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.STRAWBERRY_TREE.fruitTimeFactor] }

    const newStrawberry = new Strawberry(time, new Genome(genomeOptions, true, 'fruit')
      , flower.position, flower.parentGenome)

    this.add(newStrawberry)
    this.fruits.push(newStrawberry)
  }

  createNewBush (dt, position, genome) {
    return {
      type: 'STRAWBERRY_TREE',
      livingBeing: new StrawberryBush(dt, genome, position, 'STRAWBERRY')
    }
  }
}
