import {
  Object3D,
  PlaneBufferGeometry,
  MeshPhongMaterial,
  Mesh,
  RawShaderMaterial,
  Vector3,
  Color
} from 'three'
import HeightMap from './HeightMap'
import constant from 'utils/constant'

import vertexShader from './shaders/face.vs'
import fragmentShader from './shaders/face.fs'

export default class Face extends Object3D {
  constructor (translation, rotation, type = 'vegGarden' /* 'vegGarden' || 'orchard' */) {
    super()

    this.translationValue = translation
    this.rotationValue = rotation

    this.heightMap = new HeightMap()
    this.geometry = new PlaneBufferGeometry(constant.GROUND.WIDTH, constant.GROUND.WIDTH, constant.GROUND.SUBDIVISIONS, constant.GROUND.SUBDIVISIONS)
    this.type = type 
    this.material = new MeshPhongMaterial({
      color: (type === 'vegGarden' ? 0x451000 : 0x93f542)
      // side: DoubleSide
    })

    this.shaderMaterial = new RawShaderMaterial({
      uniforms: {
        uRadius: { value: 0.0 },
        uPointerPosition: {
          value: new Vector3()
        },
        uCircleColor: { value: new Color(0xff0000) }
      },
      transparent: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
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

    const planeShader = new Mesh(this.geometry, this.shaderMaterial)
    this.rotation.set(this.rotationValue.x, this.rotationValue.y, this.rotationValue.z)
    this.position.set(this.translationValue.x * constant.GROUND.WIDTH, this.translationValue.y * constant.GROUND.WIDTH, this.translationValue.z * constant.GROUND.WIDTH)

    this.add(plane)
    this.add(planeShader)
  }

  getLocalPositionFromGlobal (globalPos) {
    return new Vector3(globalPos.x - this.translationValue.x * constant.GROUND.WIDTH, globalPos.y - this.translationValue.y * constant.GROUND.WIDTH, globalPos.z - this.translationValue.z * constant.GROUND.WIDTH)
  }

  update (mousePosition, radius) {
    if (mousePosition) {
      mousePosition = this.getLocalPositionFromGlobal(mousePosition)
      this.shaderMaterial.uniforms.uPointerPosition.value = mousePosition
    }
    if (radius != null) {
      this.shaderMaterial.uniforms.uRadius.value = radius
      return
    }
    this.shaderMaterial.uniforms.uRadius.value = this.shaderMaterial.uniforms.uRadius.value
  }


  strongAxis() {
    return this.position.x !== 0 ? 'x' : (this.position.y !== 0 ? 'y' : 'z') 
  }
}
