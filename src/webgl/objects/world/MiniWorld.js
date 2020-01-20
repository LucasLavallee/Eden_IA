import {
  Object3D
} from 'three'
import Face from './ground/Face'
import MouseRaycaster from '@/webgl/MouseRaycaster'
import store from '@/store'

import Carot from '@/webgl/objects/livingBeings/vegetables/Carot'
import Banana from '@/webgl/objects/livingBeings/fruits/Banana'
import Tomato from '@/webgl/objects/livingBeings/fruits/Tomato'
import Pear from '@/webgl/objects/livingBeings/fruits/Pear'
import Genome from '@/webgl/genetics/Genome'
import constant from '@/utils/constant'

import { clamp } from 'utils/basicFunction'

export default class MiniWorld extends Object3D {
  constructor (position, rotation, type = 'vegGarden', camera) {
    super()

    this.rotationValue = rotation
    this.type = type
    this.entities = [] // {type: 'carot', livingBeing: {Object}}

    this.ground = new Face(position, rotation, type)

    this.raycaster = new MouseRaycaster(camera, [this.ground])

    this.init()
  }
  init () {
    this.ground.init()
    this.add(this.ground)
    this.initMouseClickEvent()
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
      if (!worldPosition) return

      switch (currentMode) {
        case 'add': {
          const currentSelection = store.getters.getCurrentSelection
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
        case 'remove': {
          // this.controls.enabled = false
          if (!worldPosition) return

          const entityToRemove = this.getEntitiesInArea(worldPosition, this.removeRadius)
          for (let entity of entityToRemove) {
            this.removeEntity(entity)
          }

          break
        }
        default: {
          // this.controls.enabled = true
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

    if (store.getters.getCurrentMode === 'remove') { this.ground.update(null, null) }

    /* const newLB = this.geneticsManager.checkReproduction(dt)
        for (const LB of newLB) {
            this.addEntity(LB.type, LB.entity)
        } */
  }
}
