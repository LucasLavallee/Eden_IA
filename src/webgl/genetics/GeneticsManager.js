
import constant from 'utils/constant'
import { distance, randomInt, randomFloat, clamp } from 'utils/basicFunction'
import Genome from './Genome'

export default class GeneticsManager {
  constructor (entities, environment, heightMap) {
    this.entities = entities
    this.environment = environment
    this.heightMap = heightMap
    this.done = [] // array that contains the entity type that have already been checked for the current cycle

    this.init()
  }

  init () {

  }

  resetCycle () {
    this.done = []
    const keys = Object.keys(this.entities)
    keys.forEach(key => {
      this.entities[key].forEach(entity => {
        this.mutate(entity.genome, true, key)
      })
    })
  }

  makeGeneticsAppend (first, second) {
    const genome = first.parentGenome
    const targetGenome = second.parentGenome

    const childrens = this.getNewChildrens(genome, targetGenome)
    const bestChildren = this.getTheBest(childrens)

    this.mutate(bestChildren.genome)
    second.parentGenome = bestChildren.genome
    second.fecondate()
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

    if (fitness < 0.6) {
      genome.lifeTime -= 40 * randomFloat(0, 1.0)
    }
    return fitness
  }

  mutate (genome, forceMutation = false, entityType = "") {
    const mutate = randomInt(0, 4) === 1 // one chance in two of being greeted

    if (!mutate && !forceMutation) { return }

    const mutateStrength = randomFloat(0, 0.05)

    Object.keys(this.environment.properties).forEach((key) => {
      const gap = this.environment.properties[key] - genome[key]
      genome[key] += gap * mutateStrength
    })


    const fitness = this.fitness(genome)
    if(genome.nbLeaves) {
      const rand = randomInt(0, 3) === 1
      if(!rand) return

      if (fitness < 0.6) {
        genome.nbLeaves = clamp(genome.nbLeaves-1, 1, constant.BUSHES_DATA[entityType].maxLeaves)
      } else if(fitness > 0.8){
        genome.nbLeaves = clamp(genome.nbLeaves+1, 1, constant.BUSHES_DATA[entityType].maxLeaves)
      }
    }

    console.log(fitness)

    if (!forceMutation) return

    if (genome.nbFlowers) {
      if (fitness < 0.6) {
        genome.nbFlowers = clamp(Math.floor(genome.nbFlowers * 0.8), 1, constant.BUSHES_DATA[entityType].maxFlowers)
      } else {
        genome.nbFlowers = clamp(Math.ceil(genome.nbFlowers * 1.2), 1, constant.BUSHES_DATA[entityType].maxFlowers)
      }
    }

    

  }

  getNewChildrens (genome, targetGenome) {
    const childrensGenome = []
    // reproduction
    for (let i = 0; i < 4; i++) {
      const createdGenome = new Genome(
        {
          size: randomInt(0, 2) === 1 ? genome.size : targetGenome.size,
          temperature: randomInt(0, 2) === 1 ? genome.temperature : targetGenome.temperature,
          pollution: randomInt(0, 2) === 1 ? genome.pollution : targetGenome.pollution,
          brightness: randomInt(0, 2) === 1 ? genome.brightness : targetGenome.brightness,
          humidity: randomInt(0, 2) === 1 ? genome.humidity : targetGenome.humidity,
          lifeTime: randomInt(0, 2) === 1 ? genome.lifeTime : targetGenome.lifeTime,
          nbFlowers: randomInt(0, 2) === 1 ? genome.nbFlowers : targetGenome.nbFlowers,
          nbLeaves: randomInt(0, 2) === 1 ? genome.nbLeaves : targetGenome.nbLeaves
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

    return myChildrens[0]
  }

  getPollutionRatio () {
    const datas = this.environment.getProperties()
    return Math.floor(clamp(datas.pollution, 10, 100) / 10) + 1
  }

  // Find a partner and test reproduction
  checkReproduction (dt, entityType) {
    if (this.done.includes(entityType)) return

    const yearTime = dt % constant.TIME_INFOS.YEAR_TIME
    const speciesData = constant.BUSHES_DATA[entityType]

    if (yearTime < constant.TIME_INFOS.YEAR_TIME * speciesData.startingCycle || yearTime > constant.TIME_INFOS.YEAR_TIME * (speciesData.startingCycle + speciesData.flowerTimeFactor)) {
      return
    }

    const flowers = this.entities[entityType].reduce((acc, entity) => [...acc, ...entity.flowers], [])

    flowers.sort(function (a, b) { return 0.5 - Math.random() })

    if (flowers.length <= 1) return

    for (let i = 0; i < flowers.length; i++) {
      const callingEntity = flowers[i]

      const rand = randomInt(0, this.getPollutionRatio())
      const fecondate = rand === 1

      if (!fecondate) continue

      for (let j = 0; j < flowers.length; j++) {
        if (j === i) continue
        const targetEntity = flowers[j]
        if (targetEntity.isFecondate) { continue }

        // Check distance between the two entities
        if (distance(callingEntity.position.x, callingEntity.position.z, targetEntity.position.x, targetEntity.position.z) > constant.BUSHES_DATA[entityType].reproductionDistance) {
          continue
        }

        this.makeGeneticsAppend(callingEntity, targetEntity)
        break
      }
    }
    this.done.push(entityType)
    return []
  }
}
