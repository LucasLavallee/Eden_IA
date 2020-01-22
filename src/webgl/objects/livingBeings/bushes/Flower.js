import LivingBeings from '../LivingBeings'
import {
  BoxGeometry,
  MeshPhongMaterial,
  Mesh
} from 'three'

export default class Flower extends LivingBeings {
  constructor (bornTime = 0, genome, position, treeGenome, dt) {
    super(bornTime, genome, position)

    this.isFecondate = false
    this.parentGenome = treeGenome
    this.pollinatorGenome = null // Genome from pollinator
    this.isBorn = false

    if (dt <= bornTime) { this.init() }
  }

  init () {
    const geometry = new BoxGeometry(1, 0.2, 1)
    const material = new MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.3
    })
    const petals = new Mesh(geometry, material)
    this.add(petals)

    const pistilGeom = new BoxGeometry(0.4, 0.4, 0.4)
    const pistilMat = new MeshPhongMaterial({
      color: 0xffe600,
      emissive: 0xffe600,
      emissiveIntensity: 0.3
    })
    const pistil = new Mesh(pistilGeom, pistilMat)
    pistil.position.y = 0.1
    this.add(pistil)

    this.isBorn = true
  }

  update (dt) {
    if (!this.isBorn && dt >= this.bornTime) {
      this.init()
      return
    }

    const age = dt - this.bornTime

    if (age > this.lifeTime) {
      this.die()
    }
  }
}
