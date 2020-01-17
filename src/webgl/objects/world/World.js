import Ground from './ground/Ground'
import { Object3D } from 'three'
import Environment from './environment/Environment'
import Carot from '@/webgl/objects/livingBeings/vegetables/Carot'
import Banana from '@/webgl/objects/livingBeings/fruits/Banana'
import Tomato from '@/webgl/objects/livingBeings/fruits/Tomato'
import Pear from '@/webgl/objects/livingBeings/fruits/Pear'
// import { randomFloat } from 'utils/basicFunction'
import constant from '@/utils/constant'
import GeneticsManager from '@/webgl/genetics/GeneticsManager'
import Genome from '@/webgl/genetics/Genome'
import MouseRaycaster from '@/webgl/MouseRaycaster'
import store from '@/store'
export default class World extends Object3D {
  constructor (camera) {
    super()

    this.currentTime = 0
    this.entities = [] // {type: 'carot', livingBeing: {Object}}

    this.ground = new Ground()
    this.environment = new Environment()
    this.geneticsManager = new GeneticsManager(this.entities, this.environment, this.ground.heightMap)
    this.raycaster = new MouseRaycaster(camera, [this.ground])

    this.init()
  }
  init () {
    this.add(this.ground)
    this.initMouseClickEvent()
    /* let nbCarots = 0
    while (nbCarots < 2) {
      const randX = randomFloat(-constant.GROUND.WIDTH / 2, constant.GROUND.WIDTH / 2)
      const randZ = randomFloat(-constant.GROUND.WIDTH / 2, constant.GROUND.WIDTH / 2)
      this.addEntity('carot', new Carot(0, new Genome(constant.DEFAULT_GENOME.CAROT, true)
        , {
          x: randX, y: this.ground.heightMap.getRelativeHeight(randX, randZ), z: randZ
        }))
      nbCarots++
    } */
  }
  addEntity (type, livingBeing) {
    this.add(livingBeing)
    this.entities.push({
      type: type,
      livingBeing: livingBeing
    })
  }
  removeEntity (entity) {
    const index = this.entities.indexOf(entity)
    this.entities.splice(index, 1)
    this.remove(entity.livingBeing)
  }
  initMouseClickEvent () {
    window.addEventListener('click', function (e) {
      const currentMode = store.getters.getCurrentMode
      switch (currentMode) {
        case 'add': {
          const currentSelection = store.getters.getCurrentSelection
          const worldPosition = this.raycaster.getIntersectionPosition()
          if (!worldPosition) return

          switch (currentSelection) {
            case 'carot':
              console.log('Carotte !')
              this.addEntity('carot', new Carot(this.currentTime, new Genome(constant.DEFAULT_GENOME.CAROT, true)
                , worldPosition))
              break
            case 'banana':
              console.log('Banana !')
              this.addEntity('banana', new Banana(this.currentTime, new Genome(constant.DEFAULT_GENOME.BANANA, true)
                , worldPosition))
              break
            case 'tomato':
              console.log('Tomato !')
              this.addEntity('tomato', new Tomato(this.currentTime, new Genome(constant.DEFAULT_GENOME.TOMATO, true)
                , worldPosition))
              break
            case 'pear':
              console.log('Pear !')
              this.addEntity('pear', new Pear(this.currentTime, new Genome(constant.DEFAULT_GENOME.PEAR, true)
                , worldPosition))
              break
            default:
              break
          }
          break
        }
        default: {
          break
        }
      }
    }.bind(this))
  }
  update (dt) {
    this.currentTime = dt
    this.entities.forEach(entity => {
      const livingBeing = entity.livingBeing
      if (livingBeing.isAlive()) {
        livingBeing.update(dt)
      } else {
        this.removeEntity(entity)
      }
    })
    const newLB = this.geneticsManager.checkReproduction(dt)
    for (const LB of newLB) {
      this.addEntity(LB.type, LB.entity)
    }
  }
}
