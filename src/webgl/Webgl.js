import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight,
  AmbientLight
} from 'three'

import {
  OrbitControls
} from './controls/OrbitControls'

import constant from 'utils/constant'

import Stats from 'stats.js'

import World from './objects/world/World'

export default class Webgl {
  constructor ($parent) {
    this.currentTime = 0
    this.render = this.render.bind(this)
    this.onResize = this.onResize.bind(this)

    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: $parent
    })

    this.renderer.setClearColor(0x7dafff, 1)
    this.renderer.preserveDrawingBuffer = true

    // $parent.appendChild(this.renderer.domElement)

    this.scene = new Scene()

    this.camera = new PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.set(constant.GROUND.WIDTH, constant.GROUND.WIDTH, constant.GROUND.WIDTH)
    this.scene.add(this.camera)

    this.light = new DirectionalLight(0xffffff, 0.7)
    this.light.position.set(2, 2, 2)
    this.scene.add(this.light)

    this.ambient = new AmbientLight(0x666666)
    this.scene.add(this.ambient)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.stats = new Stats()
    this.stats.showPanel(0)
    $parent.appendChild(this.stats.dom)

    this.init()

    this.onResize()
    this.render()

    window.addEventListener('resize', this.onResize, false)
  }

  init () {
    this.world = new World(this.camera, this.controls)
    this.scene.add(this.world)
  }

  onResize () {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  destroy () {
    while (this.scene.children.length > 0) {
      const child = this.scene.children[0]
      if (this.scene.destroy) this.scene.destroy()
      this.scene.remove(child)
    }
    this.renderer.renderLists.dispose()
  }

  render () {
    this.stats.begin()
    this.currentTime++

    this.controls.update()

    this.world.update(this.currentTime)

    this.renderer.render(this.scene, this.camera)
    this.stats.end()
    // requestAnimationFrame(this.render)
  }
}
