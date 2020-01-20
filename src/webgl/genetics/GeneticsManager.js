
import constant from 'utils/constant'
import { distance, randomInt, randomFloat, clamp } from 'utils/basicFunction'
import Genome from './Genome'
import Beet from '../objects/livingBeings/vegetables/Beet'
import Carot from '../objects/livingBeings/vegetables/Carot'
import Pepper from '../objects/livingBeings/vegetables/Pepper'
import Pumpkin from '../objects/livingBeings/vegetables/Pumpkin'
import Zucchini from '../objects/livingBeings/vegetables/Zucchini'
import Banana from '../objects/livingBeings/fruits/Banana'
import Tomato from '../objects/livingBeings/fruits/Tomato'
import Pear from '../objects/livingBeings/fruits/Pear'
import Strawberry from '../objects/livingBeings/fruits/Strawberry'
import Orange from '../objects/livingBeings/fruits/Orange'

export default class GeneticsManager {
  constructor (entities, environment, heightMap) {
    this.entities = entities
    this.environment = environment
    this.heightMap = heightMap

    this.init()
  }

  init () {

  }

  makeGeneticsAppend (first, second, time, type) {
    const genome = first.genome
    const targetGenome = second.genome

    const childrens = this.getNewChildrens(genome, targetGenome)
    const bestChildrens = this.getTheBest(childrens)

    const newBorn = []

    for (const child of bestChildrens) {
      this.mutate(child.genome)

      let newLivingBeing = null
      const spawningAngle = Math.random() * Math.PI * 2
      const newPosX = clamp(Math.cos(spawningAngle) * (10 * randomFloat(0, 1.0)) + first.position.x, -(constant.GROUND.WIDTH / 2), constant.GROUND.WIDTH / 2)
      const newPosZ = clamp(Math.sin(spawningAngle) * (10 * randomFloat(0, 1.0)) + first.position.z, -(constant.GROUND.WIDTH / 2), constant.GROUND.WIDTH / 2)

      const newBornPosition = {
        x: newPosX,
        y: this.heightMap.getRelativeHeight(newPosX, newPosZ),
        z: newPosZ
      }

      switch (type) {
        case 'carot':
          newLivingBeing = new Carot(time, child.genome, newBornPosition)
          break
        case 'beet':
          newLivingBeing = new Beet(time, child.genome, newBornPosition)
          break
        case 'pepper':
          newLivingBeing = new Pepper(time, child.genome, newBornPosition)
          break
        case 'pumpkin':
          newLivingBeing = new Pumpkin(time, child.genome, newBornPosition)
          break
        case 'zucchini':
          newLivingBeing = new Zucchini(time, child.genome, newBornPosition)
          break
        case 'banana':
          newLivingBeing = new Banana(time, child.genome, newBornPosition)
          break
        case 'tomato':
          newLivingBeing = new Tomato(time, child.genome, newBornPosition)
          break
        case 'pear':
          newLivingBeing = new Pear(time, child.genome, newBornPosition)
          break
        case 'strawberry':
          newLivingBeing = new Strawberry(time, child.genome, newBornPosition)
          break
        case 'orange':
          newLivingBeing = new Orange(time, child.genome, newBornPosition)
          break
        default:
          break
      }

      newBorn.push({
        type: first.constructor.name.toLowerCase(),
        entity: newLivingBeing
      })
    }
    return newBorn
  }

  fitness (genome) {
    let totalDelta = 0
    let nbProperties = 0

    Object.keys(this.environment.properties).forEach((key) => {
      totalDelta += Math.abs(this.environment.properties[key] - genome[key])
      nbProperties++
    })

    const maxDelta = nbProperties * 100

    const fitness = 1 - (totalDelta / maxDelta)
    console.log(fitness)

    if (fitness < 0.6) {
      genome.lifeTime -= 40 * randomFloat(0, 1.0)
    }

    return fitness
  }

  mutate (genome) {
    const mutate = randomInt(0, 4) === 1 // one chance in two of being greeted

    if (!mutate) { return }

    const mutateStrength = randomFloat(0, 0.05)

    Object.keys(this.environment.properties).forEach((key) => {
      const gap = this.environment.properties[key] - genome[key]
      genome[key] += gap * mutateStrength
    })
  }

  getNewChildrens (genome, targetGenome) {
    const childrensGenome = []
    // reproduction
    for (let i = 0; i < 4; i++) {
      const createdGenome = new Genome(
        {
          color: randomInt(0, 2) === 1 ? genome.color : targetGenome.color,
          size: randomInt(0, 2) === 1 ? genome.size : targetGenome.size,
          temperature: randomInt(0, 2) === 1 ? genome.temperature : targetGenome.temperature,
          pollution: randomInt(0, 2) === 1 ? genome.pollution : targetGenome.pollution,
          brightness: randomInt(0, 2) === 1 ? genome.brightness : targetGenome.brightness,
          humidity: randomInt(0, 2) === 1 ? genome.humidity : targetGenome.humidity,
          lifeTime: randomInt(0, 2) === 1 ? genome.lifeTime : targetGenome.lifeTime,
          reproductionRate: randomInt(0, 2) === 1 ? genome.reproductionRate : targetGenome.reproductionRate
        }, false
      )
      childrensGenome.push(createdGenome)
    }
    return childrensGenome
  }

  getTheBest (childrens) { // get the two best fitnesses
    let myChildrens = []

    for (const child of childrens) {
      myChildrens.push({
        genome: child,
        fitness: this.fitness(child)
      })
    }

    myChildrens = myChildrens.sort((a, b) => {
      return a.fitness < b.fitness
    })

    return myChildrens.slice(0, randomInt(1, 3))
  }

  checkReproduction (dt) {
    const entitiesReady = this.entities.filter(n =>
      n.livingBeing.isReadyToReproduct()
    )

    let babies = []

    for (let i = 0; i < entitiesReady.length; i++) {
      const first = entitiesReady[i].livingBeing
      for (let j = 0; j < entitiesReady.length; j++) {
        if (j === i) { continue }
        if (entitiesReady[j].type === entitiesReady[i].type) {
          const second = entitiesReady[j].livingBeing
          if (!first.isReadyToReproduct() || !second.isReadyToReproduct()) {
            continue
          }
          if (distance(first.position.x, first.position.z, second.position.x, second.position.z) > constant.REPRODUCTION.DISTANCE) {
            continue
          }

          babies = babies.concat(this.makeGeneticsAppend(first, second, dt, entitiesReady[j].type))

          first.reproduct()
          second.reproduct()

          break
        }
      }
    }
    return babies
  }
}
