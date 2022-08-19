import * as THREE from "three"
import { bubble, camera, renderer } from "./Experience"

export class Sizes {
  constructor() {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.resizeWindow()
  }

  resizeWindow() {
    window.addEventListener("resize", () => {
      // Update sizes
      this.width = window.innerWidth
      this.height = window.innerHeight

      // Update camera
      camera.camera.aspect = this.width / this.height
      camera.camera.updateProjectionMatrix()

      // Update renderer
      renderer.renderer.setSize(this.width, this.height)
      renderer.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      bubble.bubble.material.uniforms.uResolution.value = new THREE.Vector2(
        window.innerWidth,
        window.innerHeight
      )
    })
  }
}
