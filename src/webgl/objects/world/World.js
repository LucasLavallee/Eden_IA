import { Object3D, Vector3 } from 'three'
import MiniWorld from './MiniWorld'

export default class World extends Object3D {
  constructor (camera, controls) {
    super()

    this.currentTime = 0
    this.controls = controls

    this.miniWorlds = []
    this.miniWorlds.push(new MiniWorld(5, new Vector3(0, 0, 1 / 2), new Vector3(0, 0, 0), 'orchards', camera, this.controls)) // front
    this.miniWorlds.push(new MiniWorld(3, new Vector3(0, 0, -1 / 2), new Vector3(Math.PI, 0, 0), 'vegGarden', camera, this.controls)) // back

    // L & R
    this.miniWorlds.push(new MiniWorld(2, new Vector3(-1 / 2, 0, 0), new Vector3(0, -Math.PI / 2, Math.PI / 2), 'vegGarden', camera, this.controls))
    this.miniWorlds.push(new MiniWorld(4, new Vector3(1 / 2, 0, 0), new Vector3(0, Math.PI / 2, -Math.PI / 2), 'vegGarden', camera, this.controls))

    // T & B
    this.miniWorlds.push(new MiniWorld(1, new Vector3(0, 1 / 2, 0), new Vector3(-Math.PI / 2, 0, 0), 'vegGarden', camera, this.controls))
    this.miniWorlds.push(new MiniWorld(6, new Vector3(0, -1 / 2, 0), new Vector3(Math.PI / 2, 0, 0), 'orchards', camera, this.controls))

    // this.entities = [] // {type: 'carot', livingBeing: {Object}}

    // this.environment = new Environment()
    // this.geneticsManager = new GeneticsManager(this.entities, this.environment, this.ground.heightMap)
    // this.raycaster = new MouseRaycaster(camera, this.ground.children)

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
  update (dt) {
    this.currentTime = dt

    this.miniWorlds.forEach(miniWorld => {
      miniWorld.update(dt)
    })

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
