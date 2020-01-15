import LivingBeings from '../LivingBeings'

export default class Fruit extends LivingBeings {
  constructor (bornTime = 0, genome, position) {
    super(bornTime, genome, position)
  }
}
