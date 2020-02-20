import Bush from './Bush'
import Genome from '../../../genetics/Genome'
import Pepper from '../vegetables/Pepper'
import constant from '@/utils/constant'
import { Vector3, BoxBufferGeometry, MeshPhongMaterial, Mesh, Object3D } from 'three'
import { randomInt, randomFloat } from 'utils/basicFunction'

export default class PepperBush extends Bush {
  constructor (bornTime, genome, position, bushType) {
    super(bornTime, genome, position, bushType)

    this.spawn()
  }

  spawn () {
    const height = 4
    const geometry = new BoxBufferGeometry(0.3, height, 0.3)
    geometry.translate(0, height / 2, 0)
    const material = new MeshPhongMaterial({
      color: 0x40870e
    })

    const mesh = new Mesh(geometry, material)
    this.add(mesh)
    
    this.spawnablePosition.push({
      type: 'cube',
      size: new Vector3(0.3, height, 0.3),
      position: new Vector3(mesh.position.x, mesh.position.y + height / 2, mesh.position.z)
    })

    for (let i = 0; i < this.genome.nbLeaves; i++) {
      const leaveGeometry = new BoxBufferGeometry(height/4, 0.1, height/4)
      leaveGeometry.translate(0.5, randomFloat(height/4, height), 0)
      const leaveMaterial = new MeshPhongMaterial({
        color: 0x32a844
      })
      let leaveMesh = new Mesh(leaveGeometry, leaveMaterial)
      leaveMesh.rotation.y = randomInt(0, 4) * (Math.PI / 2)
      this.add(leaveMesh)
    }
  }

  deployFruit (time, flower) {
    const genomeOptions = { ...constant.DEFAULT_GENOME.PEPPER, lifeTime: [constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.PEPPER_TREE.fruitTimeFactor, constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.PEPPER_TREE.fruitTimeFactor] }

    const newPepper = new Pepper(time, new Genome(genomeOptions, true, 'fruit')
      , flower.position, flower.parentGenome)

    this.add(newPepper)
    this.fruits.push(newPepper)
  }

  createNewBush (dt, position, genome) {
    return {
      type: 'PEPPER_TREE',
      livingBeing: new PepperBush(dt, genome, position, 'PEPPER')
    }
  }
}
