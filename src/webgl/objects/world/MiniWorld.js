import {
  Object3D,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh
} from 'three'
import Face from './ground/Face'
import MouseRaycaster from '@/webgl/MouseRaycaster'
import store from '@/store'

import Genome from '@/webgl/genetics/Genome'
import constant from '@/utils/constant'

import { clamp } from 'utils/basicFunction'
import PearTree from '../livingBeings/bushes/PearTree'
import OrangeTree from '../livingBeings/bushes/OrangeTree.js'
import BananaTree from '../livingBeings/bushes/BananaTree.js'
import GeneticsManager from '../../genetics/GeneticsManager'
import PumpkinBush from '../livingBeings/bushes/PumpkinBush'
import TomatoBush from '../livingBeings/bushes/TomatoBush'
import ZucchiniBush from '../livingBeings/bushes/ZucchiniBush'
import Carot from '../livingBeings/vegetables/Carot'
import Beet from '../livingBeings/vegetables/Beet'
import StrawberryBush from '../livingBeings/bushes/StrawberryBush'
import PepperBush from '../livingBeings/bushes/PepperBush'

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

    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshPhongMaterial({
      color: 0xFF6600,
      emissive: 0xFF6600,
      emissiveIntensity: 0.3
    })
    const cube = new Mesh(geometry, material)
    cube.position.set(0,0,0)
    this.add(cube)
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

  addEntity (type, livingBeing, bornNaturally = false) {
    livingBeing.rotation.x = this.ground.rotation.x + Math.PI / 2
    livingBeing.rotation.z = this.ground.rotation.z

    
    if (!(type in this.entities)) this.entities[type] = []

    this.entities[type].push(livingBeing)

    this.add(livingBeing)

    let prevState = store.state.worlds

    prevState.presentSpecies[type]++
    prevState.planted = !bornNaturally ? prevState.planted + 1 :  prevState.planted
    prevState.bornNaturally = bornNaturally ? prevState.bornNaturally + 1 : prevState.bornNaturally

    store.state.worlds = prevState
  }

  removeEntity (type, entity) {
    const index = this.entities[type].indexOf(entity)
    this.entities[type].splice(index, 1)
    this.remove(entity)

    let prevState = store.state.worlds
    prevState.presentSpecies[type]--
    prevState.dead++
    store.state.worlds = prevState
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

          if(this.ground.type === 'vegGarden') {
            switch (currentSelection) {
              case 'beet':
                this.addEntity('BEET_TREE', new Beet(this.currentTime, new Genome(constant.DEFAULT_BUSH_GENOME.BEET_TREE, true), worldPosition, 'BEET'))          
                break
              case 'carrot':
                this.addEntity('CARROT_TREE', new Carot(this.currentTime, new Genome(constant.DEFAULT_BUSH_GENOME.CARROT_TREE, true), worldPosition, 'CARROT'))
                break
              case 'pepper': 
                this.addEntity('PEPPER_TREE', new PepperBush(this.currentTime, new Genome(constant.DEFAULT_BUSH_GENOME.PEPPER_TREE, true), worldPosition, 'PEPPER'))
                break  
              case 'pumpkin':
                this.addEntity('PUMPKIN_TREE', new PumpkinBush(this.currentTime, new Genome(constant.DEFAULT_BUSH_GENOME.PUMPKIN_TREE, true), worldPosition, 'PUMPKIN'))
                break
              case 'strawberry':
                this.addEntity('STRAWBERRY_TREE', new StrawberryBush(this.currentTime, new Genome(constant.DEFAULT_BUSH_GENOME.STRAWBERRY_TREE, true), worldPosition, 'STRAWBERRY'))
                break
              case 'tomato':
                this.addEntity('TOMATO_TREE', new TomatoBush(this.currentTime, new Genome(constant.DEFAULT_BUSH_GENOME.TOMATO_TREE, true), worldPosition, 'TOMATO'))
                break
              case 'zucchini':
                this.addEntity('ZUCCHINI_TREE', new ZucchiniBush(this.currentTime, new Genome(constant.DEFAULT_BUSH_GENOME.ZUCCHINI_TREE, true), worldPosition, 'ZUCCHINI'))
                break
              default:
                break
            }
            break
          } else {
            switch (currentSelection) {
              case 'banana':
                this.addEntity('BANANA_TREE', new BananaTree(this.currentTime, new Genome(constant.DEFAULT_BUSH_GENOME.BANANA_TREE, true), worldPosition, 'BANANA'))
                break
              case 'orange':
                this.addEntity('ORANGE_TREE', new OrangeTree(this.currentTime, new Genome(constant.DEFAULT_BUSH_GENOME.ORANGE_TREE, true), worldPosition, 'ORANGE'))
                break
              case 'pear':
                this.addEntity('PEAR_TREE', new PearTree(this.currentTime, new Genome(constant.DEFAULT_BUSH_GENOME.PEAR_TREE, true), worldPosition, 'PEAR'))
                break
              default:
                break
            }
            break
          }
          
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
          const res = entity.update(dt, this.ground.strongAxis())
          if (res && res.length > 0) {
            res.forEach(bush => {
              this.addEntity(bush.type, bush.livingBeing, true)
            })
          }
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
