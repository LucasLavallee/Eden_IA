import Bush from './Bush'
import Pear from '../fruits/Pear'
import Genome from '../../../genetics/Genome'
import constant from '@/utils/constant'
import {Vector3} from 'three'
import {clamp} from 'utils/basicFunction'

export default class PearTree extends Bush {
  constructor (bornTime, genome, position, bushType) {
    super(bornTime, genome, position, bushType)

    this.spawn()
  }

  deployFruit (time, flower) {
    const genomeOptions = { ...constant.DEFAULT_GENOME.PEAR, lifeTime: [constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.PEAR_TREE.fruitTimeFactor, constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.PEAR_TREE.fruitTimeFactor] }

    const newPear = new Pear(time, new Genome(genomeOptions, true, 'fruit')
      , flower.position, flower.parentGenome)

    this.add(newPear)
    this.fruits.push(newPear)
  }

  createNewBush (dt, position, genome, strongAxis) {

    let vectorPos = new Vector3(position.x, position.y, position.z)

    const spawningAngle = Math.random() * Math.PI * 2
  
    vectorPos.x = strongAxis === 'x' ? (vectorPos.x) : clamp(15*Math.cos(spawningAngle) + vectorPos.x, -constant.GROUND.WIDTH/2, constant.GROUND.WIDTH/2)
    vectorPos.y = strongAxis === 'y' ? (vectorPos.y) : clamp(15*Math.sin(spawningAngle) + vectorPos.y, -constant.GROUND.WIDTH/2, constant.GROUND.WIDTH/2)
    vectorPos.z = strongAxis === 'z' ? (vectorPos.z) : clamp(15*Math.sin(spawningAngle) + vectorPos.z, -constant.GROUND.WIDTH/2, constant.GROUND.WIDTH/2)

    return {
      type: 'PEAR_TREE',
      livingBeing: new PearTree(dt, genome, vectorPos, 'PEAR')
    }
  }
}
