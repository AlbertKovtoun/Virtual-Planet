import * as THREE from "three"

import backgroundVertexShader from "../../shaders/background/vertex.glsl"
import backgroundFragmentShader from "../../shaders/background/fragment.glsl"
import { bubble, scene } from "./Experience"

export class Background {
  constructor() {
    this.setBackground()
  }

  setBackground() {
    this.background = new THREE.Mesh(
      new THREE.SphereGeometry(4, 32, 32),
      new THREE.ShaderMaterial({
        vertexShader: backgroundVertexShader,
        fragmentShader: backgroundFragmentShader,
        side: THREE.BackSide,

        uniforms: {
          uColor1: {
            value: new THREE.Color(
              bubble.bubble.material.uniforms.uColorBackground.value
            ),
          },
          uColor2: {
            value: new THREE.Color(
              bubble.bubble.material.uniforms.uColor6.value
            ),
          },
        },
      })
    )
    // this.background.position.z = -2
    scene.add(this.background)
  }
}
