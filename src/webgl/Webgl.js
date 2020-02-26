import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight,
  AmbientLight,
  AxesHelper,
  Vector3
} from 'three'

import {
  OrbitControls
} from './controls/OrbitControls'

import constant from 'utils/constant'

import Stats from 'stats.js'

import World from './objects/world/World'

import store from '@/store'

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
    this.camera.position.set(constant.GROUND.WIDTH * 2, constant.GROUND.WIDTH * 2, constant.GROUND.WIDTH * 2)
    this.scene.add(this.camera)

    this.light = new DirectionalLight(0xffffff, 0.7)
    this.light.position.set(2, 2, 2)
    this.scene.add(this.light)

    this.light2 = new DirectionalLight(0xffffff, 0.7)
    this.light2.position.set(-2, -2, -2)
    this.scene.add(this.light2)

    this.ambient = new AmbientLight(0x666666)
    this.scene.add(this.ambient)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.stats = new Stats()
    this.stats.showPanel(0)
    $parent.appendChild(this.stats.dom)

    var axesHelper = new AxesHelper(15)
    this.scene.add(axesHelper)

    this.init()

    this.onResize()
    this.render()

    window.addEventListener('resize', this.onResize, false)
  }

  init () {
    this.world = new World(this.camera, this.controls)
    this.scene.add(this.world)
    this.initKeyboardListener()
  }

  initKeyboardListener () {
    window.addEventListener('keyup', function (e) {
      switch (e.keyCode) {
        case 96:
          this.controls.target = new Vector3(0, 0, 0)
          this.camera.position.set(constant.GROUND.WIDTH * 2, constant.GROUND.WIDTH * 2, constant.GROUND.WIDTH * 2)
          this.camera.rotation.set(0, 0, 0)
          store.state.activeWorld = 6
          break
        case 97:
          this.controls.target = new Vector3(0, constant.GROUND.WIDTH * 1 / 2, 0)
          this.camera.position.set(0, constant.GROUND.WIDTH * 2, 0)
          store.state.activeWorld = 0
          break
        case 98:
          this.controls.target = new Vector3(constant.GROUND.WIDTH * 1 / 2, 0, 0)
          this.camera.position.set(constant.GROUND.WIDTH * 2, 0, 0)
          store.state.activeWorld = 1
          break
        case 99:
          this.controls.target = new Vector3(0, 0, -constant.GROUND.WIDTH * 1 / 2)
          this.camera.position.set(0, 0, -constant.GROUND.WIDTH * 2)
          store.state.activeWorld = 2
          break
        case 100:
          this.controls.target = new Vector3(-constant.GROUND.WIDTH * 1 / 2, 0, 0)
          this.camera.position.set(-constant.GROUND.WIDTH * 2, 0, 0)
          store.state.activeWorld = 3
          break
        case 101:
          this.controls.target = new Vector3(0, 0, constant.GROUND.WIDTH * 1 / 2)
          this.camera.position.set(0, 0, constant.GROUND.WIDTH * 2)
          store.state.activeWorld = 4
          break
        case 102:
          this.controls.target = new Vector3(0, -constant.GROUND.WIDTH * 1 / 2, 0)
          this.camera.position.set(0, -constant.GROUND.WIDTH * 2, 0)
          store.state.activeWorld = 5
          break
        default:
          break
      }
    }.bind(this))
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
    this.currentTime += 1 * store.getters.getCurrentSpeed
    store.state.currentTime = this.currentTime

    this.controls.update()

    this.world.update(this.currentTime)

    this.renderer.render(this.scene, this.camera)
    this.stats.end()
    // requestAnimationFrame(this.render)
  }
}
