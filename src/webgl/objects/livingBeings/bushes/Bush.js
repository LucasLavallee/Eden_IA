import {
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  Vector3
} from 'three'
import LivingBeings from '../LivingBeings'
import constant from '@/utils/constant'
import { randomInt, randomFloat } from 'utils/basicFunction'
import Flower from './Flower'
import Genome from '../../../genetics/Genome'

export default class Bush extends LivingBeings {
  constructor (bornTime = 0, genome, position, bushType) {
    super(bornTime, genome, position)

    this.bushType = bushType
    this.cycleDetails = constant.BUSHES_DATA[this.bushType]
    this.cycleStarted = false

    this.lifeTime = constant.TIME_INFOS.YEAR_TIME * this.genome.lifeTime

    this.flowers = []
    this.nbFlowers = this.genome.nbFlowers
    this.fruits = []
    this.spawnablePosition = [] // useful to add flowers adn fruits
    this.readyToProduce = false

    this.spawn()
  }

  // Default Bush
  spawn () {
    const scale = 7
    const geometry = new BoxGeometry(0.3 * scale, 2 * scale, 0.3 * scale)
    geometry.translate(0, 1 * scale, 0)
    const material = new MeshPhongMaterial({
      color: 0xab2a20

    })
    const cube = new Mesh(geometry, material)
    this.add(cube)

    const geometryLeave = new BoxGeometry(1 * scale, 2 * scale, 1 * scale)
    const materialLeave = new MeshPhongMaterial({
      color: 0x40870e

    })
    const leave = new Mesh(geometryLeave, materialLeave)
    leave.position.y = 2 * scale

    this.add(leave)
    this.spawnablePosition.push({
      type: 'cube',
      size: new Vector3(1 * scale, 2 * scale, 1 * scale),
      position: leave.position
    })
  }

  deployFlowers (time) {
    for (let i = 0; i < this.nbFlowers; i++) {
      const spawnInfos = this.getRandomSpawnablePosition()
      const preciseLT = Math.ceil(this.cycleDetails.flowerTimeFactor * constant.TIME_INFOS.YEAR_TIME)

      const newFlower = new Flower(
        time + randomInt(0, preciseLT * 0.1),
        new Genome({
          size: 1.0,
          lifeTime: randomInt(preciseLT * 0.9, preciseLT * 1.1)
        }, false, 'flower'),
        spawnInfos.position,
        this.genome // could use mutation here
      )

      this.flowers.push(newFlower)

      newFlower.rotation.x = spawnInfos.normal.x * Math.PI / 2
      newFlower.rotation.z = spawnInfos.normal.z * Math.PI / 2

      this.add(newFlower)
    }
    this.cycleStarted = true
  }

  resetCycle () {
    this.cycleStarted = false
  }

  getRandomSpawnablePosition () {
    const randObject = this.spawnablePosition[randomInt(0, this.spawnablePosition.length)]
    let spawnPos = new Vector3()
    let normal = new Vector3()

    switch (randObject.type) {
      case 'sphere':
        break
      default: // cube
        const randFace = randomInt(0, 2)
        const randOrientation = randomInt(0, 2)
        switch (randFace) {
          case 1:

            // Front and Back
            spawnPos = new Vector3(
              randomFloat(randObject.position.x - randObject.size.x / 2, randObject.position.x + randObject.size.x / 2),
              randomFloat(randObject.position.y - randObject.size.y / 2, randObject.position.y + randObject.size.y / 2),
              randOrientation === 1 ? randObject.position.z + randObject.size.z / 2 : randObject.position.z - randObject.size.z / 2
            )
            normal = new Vector3(randOrientation === 1 ? 1 : -1, 0, 0)
            break
          default: // 0
            // Left and right
            spawnPos = new Vector3(
              randOrientation === 1 ? randObject.position.x + randObject.size.x / 2 : randObject.position.x - randObject.size.x / 2,
              randomFloat(randObject.position.y - randObject.size.y / 2, randObject.position.y + randObject.size.y / 2),
              randomFloat(randObject.position.z - randObject.size.z / 2, randObject.position.z + randObject.size.z / 2)
            )
            normal = new Vector3(0, 0, randOrientation === 1 ? -1 : 1)
            break
        }
        break
    }

    return {
      position: spawnPos,
      normal: normal
    }
  }

  removeFlower (flower) {
    this.flowers.splice(this.flowers.indexOf(flower), 1)
    this.remove(flower)
  }

  update (dt) {
    const age = dt - this.bornTime

    if (age < this.lifeTime) {
      if (!this.readyToProduce) { // Make bush grow
        let scale = age / constant.TIME_INFOS.YEAR_TIME
        if (scale > 1) {
          this.readyToProduce = true
          scale = 1
        }
        this.scale.set(scale, scale, scale)
      } else {
        // Starting cycle
        const currentTime = dt
        const yearTime = currentTime % constant.TIME_INFOS.YEAR_TIME

        if (yearTime > this.cycleDetails.startingCycle * constant.TIME_INFOS.YEAR_TIME) {
          if (this.cycleStarted) {
            if (this.flowers.length !== 0) {
              this.updateFlowers(dt)
              return
            }
            return
          }
          this.deployFlowers(dt)
          return
        }

        if (this.cycleStarted) { this.resetCycle() }
      }
      return
    }
    this.die()
  }

  updateFlowers (dt) {
    this.flowers.forEach(flower => {
      if (flower.isAlive()) {
        flower.update(dt)
        return
      }
      if (flower.isFecondate) {
        // Add fruit
      }
      this.removeFlower(flower)
    })
  }
}
