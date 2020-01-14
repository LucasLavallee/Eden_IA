import Ground from './ground/Ground'
import { Object3D } from 'three'
import Environment from './environment/Environment'
import Carot from '../livingBeings/vegetables/Carot'
import { distance, clamp } from 'utils/basicFunction'
import constant from 'utils/constant'
import GeneticsManager from '../../genetics/GeneticsManager'
import Genome from '../../genetics/Genome'
import MouseRaycaster from '../../MouseRaycaster'
import store from '../../../store'

export default class World extends Object3D {
  constructor (camera, controls) {
    super()

    this.currentTime = 0
    this.controls = controls
    this.removeRadius = 5.0

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
  }

  getEntitiesInArea (position, radius) {
    let foundEntities = []

    for (let entity of this.entities) {
      let entityPosition = entity.livingBeing.position
      if (distance(entityPosition.x, entityPosition.z, position.x, position.z) < radius) { foundEntities.push(entity) }
    }

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
              this.addEntity('carot', new Carot(this.currentTime, new Genome(constant.DEFAULT_GENOME.CAROT, true)
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
      }
      // else {
      //   this.ground.update(null, 0.0)
      // }
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

    const newLB = this.geneticsManager.checkReproduction(dt)
    for (const LB of newLB) {
      this.addEntity(LB.type, LB.entity)
    }
  }
}
