import Bush from './Bush'
import Genome from '../../../genetics/Genome'
import Pumpkin from '../vegetables/Pumpkin'
import constant from '@/utils/constant'
import Params from '../../../lSystems/Params'
import {Vector3, BoxBufferGeometry, MeshPhongMaterial, Mesh, Object3D} from 'three'
import {randomFloat} from 'utils/basicFunction'

export default class PumpkinBush extends Bush {
  constructor (bornTime, genome, position, bushType) {
    super(bornTime, genome, position, bushType)

    this.spawn()
  }

  spawn() { 
    const nbLeaves = this.genome.nbLeaves
    const width = 4
    let currentRot = 0
    for(let i = 0; i < nbLeaves; i++) {
        const branch = new Object3D()
        const geometry = new BoxBufferGeometry(width,0.1,0.1)
        geometry.translate(width/2, 0, 0)
        /*geometry.rotateZ(Math.PI/10)
        geometry.rotateY(currentRot)*/
        const material = new MeshPhongMaterial({
            color: 0x32a844
        })
        let mesh = new Mesh( geometry, material )
        branch.add(mesh)

        //leaves
        for(let j = 0; j < 3 ; j++) {
            const leaveGeometry = new BoxBufferGeometry(1.5,0.1,1.5)
            leaveGeometry.rotateY(randomFloat(0.0, Math.PI/2))
            leaveGeometry.translate((width/3) * (j+1) , 0.3, 0)
            const leaveMaterial = new MeshPhongMaterial({
                color: 0x32a844
            })
            let leaveMesh = new Mesh( leaveGeometry, leaveMaterial )
            branch.add(leaveMesh)

            this.spawnablePosition.push({
                type: 'cube',
                size: new Vector3(1.5,0.1,1.5),
                position: leaveMesh.position
            })
        }

        branch.rotation.set(0, currentRot, Math.PI/12)

        currentRot += (2*Math.PI) / nbLeaves
        this.add(branch)
    }
    
  }

  deployFruit (time, position, newParentGenome) {
    const genomeOptions = { ...constant.DEFAULT_GENOME.PUMPKIN, lifeTime: [constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.PUMPKIN_TREE.fruitTimeFactor, constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.PUMPKIN_TREE.fruitTimeFactor] }

    const newPumpkin = new Pumpkin(time, new Genome(genomeOptions, true, 'fruit')
      , position, newParentGenome)

    this.add(newPumpkin)
    this.fruits.push(newPumpkin)
  }

  createNewBush (dt, position) {
    return {
      type: 'PUMPKIN_TREE',
      livingBeing: new PumpkinBush(dt, new Genome(constant.DEFAULT_BUSH_GENOME.PUMPKIN_TREE, true), position, 'PUMPKIN')
    }
  }
}
