import {
  Object3D,
  RawShaderMaterial,
  MeshPhongMaterial,
  Mesh,
  PlaneBufferGeometry,
  Color,
  DoubleSide,
  Vector2
} from 'three'

import vertexShader from './shaders/ground.vs'
import fragmentShader from './shaders/ground.fs'

import HeightMap from './HeightMap'

import constant from 'utils/constant'

export default class Ground extends Object3D {
  constructor () {
    super()

    this.heightMap = new HeightMap()

    this.geometry = new PlaneBufferGeometry(constant.GROUND.WIDTH, constant.GROUND.WIDTH, constant.GROUND.SUBDIVISIONS, constant.GROUND.SUBDIVISIONS)

    this.material = new MeshPhongMaterial({
      color: 0x451000
    })

    this.shaderMaterial = new RawShaderMaterial({
      uniforms: {
        uRadius: { value: 0.0 },
        uPointerPosition: {
          value: new Vector2()
        },
        uCircleColor: { value: new Color(0xff0000) }
      },
      transparent: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: DoubleSide
    })

    this.material.flatShading = true

    this.init()
  }

  init () {
    const vertices = this.geometry.attributes.position.array
    for (let i = 0; i < constant.GROUND.SUBDIVISIONS; i++) {
      for (let j = 0; j < constant.GROUND.SUBDIVISIONS; j++) {
        vertices[(i * (constant.GROUND.SUBDIVISIONS + 1) + j) * 3 + 2] = this.heightMap.getHeight(i, j)
      }
    }

    const plane = new Mesh(this.geometry, this.material)
    plane.rotation.x = Math.PI / 2
    plane.rotation.y = Math.PI

    const planeShader = new Mesh(this.geometry, this.shaderMaterial)
    planeShader.rotation.x = Math.PI / 2
    planeShader.rotation.y = Math.PI

    this.add(plane)
    this.add(planeShader)
  }

  update (mousePosition, radius) {
    if (mousePosition) {
      this.shaderMaterial.uniforms.uPointerPosition.value = new Vector2(mousePosition.x, mousePosition.z)
    }
    if (radius != null) {
      this.shaderMaterial.uniforms.uRadius.value = radius
      return
    }
    this.shaderMaterial.uniforms.uRadius.value = this.shaderMaterial.uniforms.uRadius.value
  }
}
