import { Raycaster } from 'three'

export default class MouseRaycaster {
  constructor (camera, objects = []) {
    this.camera = camera
    this.objects = objects
    this.raycaster = new Raycaster()

    this.intersectionDetected = false
    this.intersectionPosition = null
    this.init()
  }

  init () {
    // setting up event
    window.addEventListener('mousemove', function (e) {
      const mouse = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      }
      this.raycaster.setFromCamera(mouse, this.camera)

      const intersects = this.raycaster.intersectObjects(this.objects, true)

      if (intersects.length > 0) {
        this.intersectionDetected = true
        this.intersectionPosition = intersects[0].point
      } else {
        this.intersectionDetected = false
        this.intersectionPosition = null
      }
    }.bind(this))
  }

  getIntersectionPosition () {
    return this.intersectionPosition
  }
}
