import constant from 'utils/constant'
import { randomFloat } from 'utils/basicFunction'

export default class HeightMap {
  constructor () {
    this.max = constant.GROUND.MAX ? constant.GROUND.MAX : 0.5

    this.height = []

    this.init()
  }

  init () {
    for (let i = 0; i < constant.GROUND.SUBDIVISIONS; i++) {
      this.height[i] = []
      for (let j = 0; j < constant.GROUND.SUBDIVISIONS; j++) {
        this.height[i][j] = randomFloat(0.0, this.max)
      }
    }
  }

  getHeight (x, y) {
    return this.height[x][y]
  }

  getRelativeHeight (x, y) {
    x += constant.GROUND.WIDTH / 2
    y += constant.GROUND.WIDTH / 2
    return this.height[Math.floor((constant.GROUND.SUBDIVISIONS * x) / constant.GROUND.WIDTH)][Math.floor((constant.GROUND.SUBDIVISIONS * y) / constant.GROUND.WIDTH)]
  }
}
