import { Object3D, Vector3 } from 'three'
import MiniWorld from './MiniWorld'
import Environment from './environment/Environment'

import store from '@/store'
// import carot from '../../../assets/carot.cur'

export default class World extends Object3D {
  constructor (camera, controls) {
    super()

    this.currentTime = 0
    this.controls = controls

    this.environment = new Environment()

    this.miniWorlds = []
    this.miniWorlds.push(new MiniWorld({
      miniWorldId: 4,
      position: new Vector3(0, 0, 1 / 2),
      rotation: new Vector3(0, 0, 0),
      type: 'orchards',
      camera: camera,
      controls: this.controls,
      environment: this.environment
    })) // front

    this.miniWorlds.push(new MiniWorld({
      miniWorldId: 2,
      position: new Vector3(0, 0, -1 / 2),
      rotation: new Vector3(Math.PI, 0, 0),
      type: 'vegGarden',
      camera: camera,
      controls: this.controls,
      environment: this.environment
    })) // back

    // L & R
    this.miniWorlds.push(new MiniWorld({
      miniWorldId: 1,
      position: new Vector3(-1 / 2, 0, 0),
      rotation: new Vector3(0, -Math.PI / 2, Math.PI / 2),
      type: 'vegGarden',
      camera: camera,
      controls: this.controls,
      environment: this.environment
    }))

    this.miniWorlds.push(new MiniWorld({
      miniWorldId: 3,
      position: new Vector3(1 / 2, 0, 0),
      rotation: new Vector3(0, Math.PI / 2, -Math.PI / 2),
      type: 'vegGarden',
      camera: camera,
      controls: this.controls,
      environment: this.environment
    }))

    // T & B
    this.miniWorlds.push(new MiniWorld({
      miniWorldId: 0,
      position: new Vector3(0, 1 / 2, 0),
      rotation: new Vector3(-Math.PI / 2, 0, 0),
      type: 'vegGarden',
      camera: camera,
      controls: this.controls,
      environment: this.environment
    }))
    this.miniWorlds.push(new MiniWorld({
      miniWorldId: 5,
      position: new Vector3(0, -1 / 2, 0),
      rotation: new Vector3(Math.PI / 2, 0, 0),
      type: 'orchards',
      camera: camera,
      controls: this.controls,
      environment: this.environment
    }))

    this.init()
  }
  init () {
    for (let i = 0; i < this.miniWorlds.length; i++) {
      this.add(this.miniWorlds[i])
    }
  }

  getEntitiesInArea (position, radius) {
    /* let foundEntities = []

    for (let entity of this.entities) {
      let entityPosition = entity.livingBeing.position
      if (distance(entityPosition.x, entityPosition.z, position.x, position.z) < radius) { foundEntities.push(entity) }
    }

    return foundEntities */
  }

  addEntity (type, livingBeing) {
  }

  removeEntity (entity) {
  }

  initMouseClickEvent () {

  }

  // Cursor

  checkMode () {
    const mode = store.getters.getCurrentMode
    const app = document.getElementById('app')

    switch (mode) {
      case 'Add':
        app.style.cursor = 'crosshair'
        break
      case 'Navigate':
        app.style.cursor = 'move'
        break
      case 'Remove':
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

    this.miniWorlds.forEach(miniWorld => {
      miniWorld.update(dt)
    })

    this.environment.update()

    /* this.entities.forEach(entity => {
      const livingBeing = entity.livingBeing

      if (livingBeing.isAlive()) {
        livingBeing.update(dt)
      } else {
        this.removeEntity(entity)
      }
    })

    if (store.getters.getCurrentMode === 'remove') { this.ground.update(null, null) } */

    /* const newLB = this.geneticsManager.checkReproduction(dt)
    for (const LB of newLB) {
      this.addEntity(LB.type, LB.entity)
    } */
  }
}
