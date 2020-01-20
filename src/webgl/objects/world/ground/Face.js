import {
  Object3D,
  PlaneBufferGeometry,
  MeshPhongMaterial,
  Mesh
  // DoubleSide
} from 'three'
import HeightMap from './HeightMap'
import constant from 'utils/constant'

export default class Face extends Object3D {
  constructor (translation, rotation, type = 'vegGarden' /* 'vegGarden' || 'orchard' */) {
    super()

    this.translationValue = translation
    this.rotationValue = rotation

    this.heightMap = new HeightMap()
    this.geometry = new PlaneBufferGeometry(constant.GROUND.WIDTH, constant.GROUND.WIDTH, constant.GROUND.SUBDIVISIONS, constant.GROUND.SUBDIVISIONS)

    this.material = new MeshPhongMaterial({
      color: (type === 'vegGarden' ? 0x451000 : 0x93f542)
      // side: DoubleSide
    })
    this.material.flatShading = true
  }

  init () {
    const vertices = this.geometry.attributes.position.array
    for (let i = 0; i < constant.GROUND.SUBDIVISIONS; i++) {
      for (let j = 0; j < constant.GROUND.SUBDIVISIONS; j++) {
        vertices[(i * (constant.GROUND.SUBDIVISIONS + 1) + j) * 3 + 2] = this.heightMap.getHeight(i, j)
      }
    }

    const plane = new Mesh(this.geometry, this.material)
    this.rotation.set(this.rotationValue.x, this.rotationValue.y, this.rotationValue.z)
    this.position.set(this.translationValue.x * constant.GROUND.WIDTH, this.translationValue.y * constant.GROUND.WIDTH, this.translationValue.z * constant.GROUND.WIDTH)

    this.add(plane)
  }

  update () {}
}
