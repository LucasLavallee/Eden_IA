import Bush from './Bush'
import Orange from '../fruits/Orange'
import Genome from '../../../genetics/Genome'
import constant from '@/utils/constant'
import Params from '../../../lSystems/Params'
import LSystemBuilder from '../../../lSystems/LSystemBuilder'
import { Vector3 } from 'three'
import { clamp } from 'utils/basicFunction'

export default class OrangeTree extends Bush {
  constructor (bornTime, genome, position, bushType) {
    super(bornTime, genome, position, bushType)

    this.spawn()
  }

  spawn () { // L-System
    const rules = [{
      entry: 'A',
      exit: 'F[++A]X[--A]^^^A'
    }]
    const lsystemParams = new Params('FFFFFA', rules, 2, 25 + 5 * this.genome.nbLeaves, 2, 1, 0.05, 0.05)
    const lSystem = new LSystemBuilder(lsystemParams.rewriteWithRules('FFFFFA', rules.iterations), lsystemParams, new Vector3(0, 0, 0))
    const tree = lSystem.build()

    this.add(tree.tree)

    this.spawnablePosition = tree.spawnablePositions
  }

  deployFruit (time, flower) {
    const genomeOptions = { ...constant.DEFAULT_GENOME.ORANGE, lifeTime: [constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.ORANGE_TREE.fruitTimeFactor, constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.ORANGE_TREE.fruitTimeFactor] }

    const newOrange = new Orange(time, new Genome(genomeOptions, true, 'fruit')
      , flower.position, flower.parentGenome)

    this.add(newOrange)
    this.fruits.push(newOrange)
  }

  createNewBush (dt, position, genome, strongAxis) {


    let vectorPos = new Vector3(position.x, position.y, position.z)

    const spawningAngle = Math.random() * Math.PI * 2
  
    vectorPos.x = strongAxis === 'x' ? (vectorPos.x) : clamp(5*Math.cos(spawningAngle) + vectorPos.x, -constant.GROUND.WIDTH/2, constant.GROUND.WIDTH/2)
    vectorPos.y = strongAxis === 'y' ? (vectorPos.y) : clamp(5*Math.sin(spawningAngle) + vectorPos.y, -constant.GROUND.WIDTH/2, constant.GROUND.WIDTH/2)
    vectorPos.z = strongAxis === 'z' ? (vectorPos.z) : clamp(5*Math.sin(spawningAngle) + vectorPos.z, -constant.GROUND.WIDTH/2, constant.GROUND.WIDTH/2)
    
    return {
      type: 'ORANGE_TREE',
      livingBeing: new OrangeTree(dt, genome, vectorPos, 'ORANGE')
    }
  }
}
