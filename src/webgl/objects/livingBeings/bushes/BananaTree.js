import Bush from './Bush'
import Banana from '../fruits/Banana'
import Genome from '../../../genetics/Genome'
import constant from '@/utils/constant'

export default class BananaTree extends Bush {
  constructor (bornTime, genome, position, bushType) {
    super(bornTime, genome, position, bushType)

    this.spawn()
  }

  deployFruit (time, position, newParentGenome) {
    const genomeOptions = { ...constant.DEFAULT_GENOME.BANANA, lifeTime: [constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.BANANA_TREE.fruitTimeFactor, constant.TIME_INFOS.YEAR_TIME * constant.BUSHES_DATA.BANANA_TREE.fruitTimeFactor] }

    const newBanana = new Banana(time, new Genome(genomeOptions, true, 'fruit')
      , position, newParentGenome)

    this.add(newBanana)
    this.fruits.push(newBanana)
  }

  createNewBush (dt, position) {
    return {
      type: 'BANANA_TREE',
      livingBeing: new BananaTree(dt, new Genome(constant.DEFAULT_BUSH_GENOME.BANANA_TREE, true), position, 'BANANA')
    }
  }
}
