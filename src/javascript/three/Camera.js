import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { canvas, scene, sizes } from "./Experience"

export class Camera {
  constructor() {
    this.cursor = { x: 0, y: 0 }

    this.setCamera()
    this.getPositionOfCursor()
    // this.setCameraControls()
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      40,
      sizes.width / sizes.height,
      0.1,
      100
    )
    this.camera.position.set(0, 0, 3.5)
    scene.add(this.camera)
  }

  getPositionOfCursor() {
    window.addEventListener("mousemove", (ev) => {
      this.cursor.x = ev.clientX / sizes.width - 0.5
      this.cursor.y = ev.clientY / sizes.height - 0.5
    })
  }

  update() {
    this.cameraX = this.cursor.x
    this.cameraY = -this.cursor.y

    //Smooth
    this.camera.position.x +=
      (this.cameraX * 4 - this.camera.position.x + 0) / 50

    this.camera.position.y +=
      (this.cameraY * 2 - this.camera.position.y + 0) / 50

    this.camera.lookAt(0, 0, 0)
  }

  // setCameraControls() {
  //   this.controls = new OrbitControls(this.camera, canvas)
  //   this.controls.enableDamping = true

  //   this.controls.target.set(0, 0, 0)
  // }
}
