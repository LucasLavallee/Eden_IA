import Bush from './Bush'
import Orange from '../fruits/Orange'
import Genome from '../../../genetics/Genome'
import constant from '@/utils/constant'
import Params from '../../../lSystems/Params'
import LSystemBuilder from '../../../lSystems/LSystemBuilder'
import {Vector3} from 'three'

export default class OrangeTree extends Bush {
  constructor (bornTime, genome, position, bushType) {
    super(bornTime, genome, position, bushType)

    this.spawn()
  }

  spawn() { //L-System
    /*const rules = [{
      entry: 'A',
      exit: 'F[++A]X[--A]^^^A'
    }]*/

    const rules = [{
      entry: 'A',
      exit: '[&FFFA]>>>>[&FFFA]>>>>[&FFFA]'
    }]
    //const lsystemParams = new Params("FFFFFA", rules,3, 25, 1, 0.2, 0.05, 0.05)
    const lsystemParams = new Params("FFFA", rules,3, 10, 1, 0.2, 0.05, 0.05)
    const lSystem = new LSystemBuilder(lsystemParams.rewriteWithRules("FFFFFA", rules.iterations), lsystemParams, new Vector3(0,0,0))
    const tree = lSystem.build()

    this.add(tree)

    this.spawnablePosition.push({
      type: 'cube',
      size: new Vector3(1,1,1),
      position: new Vector3(0,0,0)
    })
  }

  deployFruit (time, position, newParentGenome) {
    const genomeOptions = { ...constant.DEFAULT_GENOME.ORANGE, lifeTime: [constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.ORANGE_TREE.fruitTimeFactor, constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.ORANGE_TREE.fruitTimeFactor] }

    const newOrange = new Orange(time, new Genome(genomeOptions, true, 'fruit')
      , position, newParentGenome)

    this.add(newOrange)
    this.fruits.push(newOrange)
  }

  createNewBush (dt, position) {
    return {
      type: 'ORANGE_TREE',
      livingBeing: new OrangeTree(dt, new Genome(constant.DEFAULT_BUSH_GENOME.ORANGE_TREE, true), position, 'ORANGE')
    }
  }
}
