import Bush from './Bush'
import Pear from '../fruits/Pear'
import Genome from '../../../genetics/Genome'
import constant from '@/utils/constant'

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

  createNewBush (dt, position, genome) {
    console.log(genome)
    return {
      type: 'PEAR_TREE',
      livingBeing: new PearTree(dt, genome, position, 'PEAR')
    }
  }
}
