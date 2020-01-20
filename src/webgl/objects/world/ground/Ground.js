import {
  Object3D,
  Vector3
} from 'three'

import Face from './Face'

export default class Ground extends Object3D {
  constructor () {
    super()

    this.faces = []

    this.faces.push(new Face(new Vector3(0, 1 / 2, 0), new Vector3(Math.PI / 2, Math.PI, 0), 'orchard')) // up
    this.faces.push(new Face(new Vector3(0, -1 / 2, 0), new Vector3(-Math.PI / 2, Math.PI, 0), 'vegGarden')) // down

    for (let i = -1; i < 2; i++) {
      if (i === 0) { continue }
      this.faces.push(new Face(new Vector3(0, 0, i * (1 / 2)), new Vector3(0, (i - 1) * Math.PI / 2, 0), 'orchard'))
      this.faces.push(new Face(new Vector3(i * (1 / 2), 0, 0), new Vector3(0, i * Math.PI / 2, 0), 'vegGarden'))
    }

    this.init()
  }

  init () {
    for (let i = 0; i < this.faces.length; i++) {
      this.faces[i].init()
      this.add(this.faces[i])
    }
  }

  update (mousePosition, radius) {
    /* if (mousePosition) {
      this.shaderMaterial.uniforms.uPointerPosition.value = new Vector2(mousePosition.x, mousePosition.z)
    }
    if (radius != null) {
      this.shaderMaterial.uniforms.uRadius.value = radius
      return
    }
    this.shaderMaterial.uniforms.uRadius.value = this.shaderMaterial.uniforms.uRadius.value */
  }
}
