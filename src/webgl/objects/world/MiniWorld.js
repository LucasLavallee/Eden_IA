import {
  Object3D
} from 'three'
import Face from './ground/Face'
import MouseRaycaster from '@/webgl/MouseRaycaster'
import store from '@/store'

// import Carot from '@/webgl/objects/livingBeings/vegetables/Carot'
import Banana from '@/webgl/objects/livingBeings/fruits/Banana'
import Tomato from '@/webgl/objects/livingBeings/fruits/Tomato'
import Pear from '@/webgl/objects/livingBeings/fruits/Pear'
import Genome from '@/webgl/genetics/Genome'
import constant from '@/utils/constant'

import { clamp } from 'utils/basicFunction'
import PearTree from '../livingBeings/bushes/PearTree'
import GeneticsManager from '../../genetics/GeneticsManager'

export default class MiniWorld extends Object3D {
  constructor (options/* miniWorldId, position, rotation, type = 'vegGarden', camera, controls */) {
    super()

    this.lastLoopTime = 0

    this.miniWorldId = options.miniWorldId
    this.removeRadius = 5.0
    this.rotationValue = options.rotation
    this.type = options.type
    this.entities = []

    this.controls = options.controls

    this.ground = new Face(options.position, options.rotation, options.type)

    this.raycaster = new MouseRaycaster(options.camera, [this.ground])

    this.geneticsManager = new GeneticsManager(this.entities, options.environment)

    this.init()
  }
  init () {
    this.ground.init()
    this.add(this.ground)
    this.initMouseClickEvent()
  }

  resetCycle () {
    this.geneticsManager.resetCycle()

    const keys = Object.keys(this.entities)
    keys.forEach(key => {
      this.entities[key].forEach(entity => {
        entity.resetCycle()
      })
    })
  }

  getEntitiesInArea (position, radius) {
    let foundEntities = []

    /* for (let entity of this.entities) {
            let entityPosition = entity.livingBeing.position
            if (distance(entityPosition.x, entityPosition.z, position.x, position.z) < radius) { foundEntities.push(entity) }
        } */

    return foundEntities
  }

  addEntity (type, livingBeing) {
    livingBeing.rotation.x = this.ground.rotation.x + Math.PI / 2
    livingBeing.rotation.z = this.ground.rotation.z

    if (!(type in this.entities)) this.entities[type] = []

    this.entities[type].push(livingBeing)
    this.add(livingBeing)
  }

  removeEntity (type, entity) {
    const index = this.entities[type].indexOf(entity)
    this.entities[type].splice(index, 1)
    this.remove(entity)
  }

  initMouseClickEvent () {
    window.addEventListener('click', function (e) {
      const currentMode = store.getters.getCurrentMode
      const worldPosition = this.raycaster.getIntersectionPosition()
      if (!worldPosition) return

      switch (currentMode) {
        case 'add': {
          const currentSelection = store.getters.getCurrentSelection
          if (!worldPosition) return

          switch (currentSelection) {
            case 'carot':
              this.addEntity('PEAR_TREE', new PearTree(this.currentTime, new Genome(constant.DEFAULT_BUSH_GENOME.PEAR_TREE, true), worldPosition, 'PEAR'))
              break
            case 'banana':
              this.addEntity('banana', new Banana(this.currentTime, new Genome(constant.DEFAULT_GENOME.BANANA, true)
                , worldPosition))
              break
            case 'tomato':
              this.addEntity('tomato', new Tomato(this.currentTime, new Genome(constant.DEFAULT_GENOME.TOMATO, true)
                , worldPosition))
              break
            case 'pear':
              this.addEntity('pear', new Pear(this.currentTime, new Genome(constant.DEFAULT_GENOME.PEAR, true)
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
      const currentId = store.getters.getActiveWorld
      const worldPosition = this.raycaster.getIntersectionPosition()
      if (currentMode === 'remove' && this.miniWorldId === currentId) {
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

  update (dt) {
    this.currentTime = dt

    const yearTime = dt % constant.TIME_INFOS.YEAR_TIME
    if (this.lastLoopTime > yearTime) this.resetCycle()
    this.lastLoopTime = yearTime

    const keys = Object.keys(this.entities)

    for (let i = 0; i < keys.length; i++) {
      this.entities[keys[i]].forEach(entity => {
        // check if entity is still alive
        if (entity.isAlive()) {
          entity.update(dt)
        } else {
          this.removeEntity(keys[i], entity)
        }
      })
      this.geneticsManager.checkReproduction(dt, keys[i])
    }

    const currentId = store.getters.getActiveWorld
    if (store.getters.getCurrentMode === 'remove' && this.miniWorldId === currentId) { this.ground.update(null, null) }
  }
}
