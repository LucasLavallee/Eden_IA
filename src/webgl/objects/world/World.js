import Ground from './ground/Ground'
import { Object3D } from 'three'
import Environment from './environment/Environment'
import PannelUI from '@/components/UI/PannelUI'

import Carot from '@/webgl/objects/livingBeings/vegetables/Carot'
import Pumpkin from '@/webgl/objects/livingBeings/vegetables/Pumpkin'
import Pepper from '@/webgl/objects/livingBeings/vegetables/Pepper'
import Zucchini from '@/webgl/objects/livingBeings/vegetables/Zucchini'
import Beet from '@/webgl/objects/livingBeings/vegetables/Beet'

import Banana from '@/webgl/objects/livingBeings/fruits/Banana'
import Tomato from '@/webgl/objects/livingBeings/fruits/Tomato'
import Pear from '@/webgl/objects/livingBeings/fruits/Pear'
import Strawberry from '@/webgl/objects/livingBeings/fruits/Strawberry'
import Orange from '@/webgl/objects/livingBeings/fruits/Orange'

import constant from '@/utils/constant'
import GeneticsManager from '@/webgl/genetics/GeneticsManager'
import Genome from '@/webgl/genetics/Genome'
import MouseRaycaster from '@/webgl/MouseRaycaster'
import store from '@/store'
import { distance, clamp } from 'utils/basicFunction'
// import carot from '../../../assets/carot.cur'

export default class World extends Object3D {
  constructor (camera, controls) {
    super()

    this.currentTime = 0
    this.controls = controls
    this.removeRadius = 5.0

    this.entities = [] // {type: 'carot', livingBeing: {Object}}

    this.ground = new Ground()
    this.environment = new Environment()
    this.pannelUI = new PannelUI()
    this.geneticsManager = new GeneticsManager(this.entities, this.environment, this.ground.heightMap)
    this.raycaster = new MouseRaycaster(camera, [this.ground])

    this.init()
  }
  init () {
    this.add(this.ground)
    this.initMouseClickEvent()
    this.checkMode()
  }

  getEntitiesInArea (position, radius) {
    let foundEntities = []

    for (let entity of this.entities) {
      let entityPosition = entity.livingBeing.position
      if (distance(entityPosition.x, entityPosition.z, position.x, position.z) < radius) { foundEntities.push(entity) }
    }
    console.log(foundEntities)

    return foundEntities
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
      const worldPosition = this.raycaster.getIntersectionPosition()
      switch (currentMode) {
        case 'add': {
          this.controls.enabled = false
          const currentSelection = store.getters.getCurrentSelection

          if (!worldPosition) return

          switch (currentSelection) {
            case 'carot':
              console.log('Carotte !')
              this.addEntity('carot', new Carot(this.currentTime, new Genome(constant.DEFAULT_GENOME.CAROT, true)
                , worldPosition))
              break
            case 'beet':
              console.log('Beet !')
              this.addEntity('beet', new Beet(this.currentTime, new Genome(constant.DEFAULT_GENOME.BEET, true)
                , worldPosition))
              break
            case 'pepper':
              console.log('Pepper !')
              this.addEntity('pepper', new Pepper(this.currentTime, new Genome(constant.DEFAULT_GENOME.PEPPER, true)
                , worldPosition))
              break
            case 'pumpkin':
              console.log('Pumpkin !')
              this.addEntity('pumpkin', new Pumpkin(this.currentTime, new Genome(constant.DEFAULT_GENOME.PUMPKIN, true)
                , worldPosition))
              break
            case 'zucchini':
              console.log('Zucchini !')
              this.addEntity('zucchini', new Zucchini(this.currentTime, new Genome(constant.DEFAULT_GENOME.ZUCCHINI, true)
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
            case 'strawberry':
              console.log('Strawberry !')
              this.addEntity('strawberry', new Strawberry(this.currentTime, new Genome(constant.DEFAULT_GENOME.STRAWBERRY, true)
                , worldPosition))
              break
            case 'orange':
              console.log('Orange !')
              this.addEntity('orange', new Orange(this.currentTime, new Genome(constant.DEFAULT_GENOME.ORANGE, true)
                , worldPosition))
              break
            default:
              break
          }
          break
        }
        case 'remove': {
          this.controls.enabled = false
          if (!worldPosition) return

          const entityToRemove = this.getEntitiesInArea(worldPosition, this.removeRadius)
          for (let entity of entityToRemove) {
            this.removeEntity(entity)
          }

          break
        }
        default: {
          this.controls.enabled = true
          break
        }
      }
    }.bind(this))

    // MOUSE MOVE
    window.addEventListener('mousemove', function (e) {
      const currentMode = store.getters.getCurrentMode
      const worldPosition = this.raycaster.getIntersectionPosition()

      if (currentMode === 'remove') {
        this.ground.update(worldPosition, this.removeRadius)
      } else {
        this.ground.update(null, 0.0)
      }
    }.bind(this))

    // SCROLL
    window.addEventListener('wheel', function (e) {
      const currentMode = store.getters.getCurrentMode

      if (currentMode !== 'remove') { return }

      const delta = Math.sign(event.deltaY)

      if (delta === -1) {
        this.removeRadius = clamp(this.removeRadius - 5, 5, 40)
      } else if (delta === 1) {
        this.removeRadius = clamp(this.removeRadius + 5, 5, 40)
      }
    }.bind(this))
  }

  // Cursor

  checkMode () {
    const mode = store.getters.getCurrentMode
    const app = document.getElementById('app')

    switch (mode) {
      case 'add':
        app.style.cursor = 'crosshair'
        break
      case 'navigate':
        app.style.cursor = 'move'
        break
      case 'remove':
        app.style.cursor = 'default'
        break
      default:
        app.style.cursor = 'default'
        break
    }
  }

  update (dt) {
    this.checkMode()
    this.currentTime = dt

    this.entities.forEach(entity => {
      const livingBeing = entity.livingBeing

      if (livingBeing.isAlive()) {
        livingBeing.update(dt)
      } else {
        this.removeEntity(entity)
      }
    })

    if (store.getters.getCurrentMode === 'remove') { this.ground.update(null, null) }

    const newLB = this.geneticsManager.checkReproduction(dt)
    for (const LB of newLB) {
      this.addEntity(LB.type, LB.entity)
    }
  }
}
