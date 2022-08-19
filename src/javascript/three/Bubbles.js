import * as THREE from "three"

import bubbleVertexShader from "../../shaders/bubble2/vertex.glsl"
import bubbleFragmentShader from "../../shaders/bubble2/fragment.glsl"

import bubbleTopLayerVertexShader from "../../shaders/bubbleTopLayer/vertex.glsl"
import bubbleTopLayerFragmentShader from "../../shaders/bubbleTopLayer/fragment.glsl"

import {
  bubbleFolder,
  cloudsFolder,
  debugObject,
  loaders,
  pane,
  randomInteger,
  scene,
  sizes,
} from "./Experience"
import { colorPalette } from "../colorPalette"

export class Bubble {
  constructor() {
    this.setBubble()
    this.setBubbleTopLayer()
    this.setTweaks()
  }

  setBubble() {
    let randomColorIndex = randomInteger(0, 12)

    this.bubble = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: bubbleVertexShader,
        fragmentShader: bubbleFragmentShader,
        transparent: true,

        uniforms: {
          uTime: { value: 0 },

          uColorBackground: {
            value: new THREE.Color(colorPalette[randomColorIndex][0]),
          },
          uColor1: {
            value: new THREE.Color(colorPalette[randomColorIndex][1]),
          },
          uColor2: {
            value: new THREE.Color(colorPalette[randomColorIndex][2]),
          },
          uColor3: {
            value: new THREE.Color(colorPalette[randomColorIndex][3]),
          },
          uColor4: {
            value: new THREE.Color(colorPalette[randomColorIndex][4]),
          },
          uColor5: {
            value: new THREE.Color(colorPalette[randomColorIndex][5]),
          },
          uColor6: {
            value: new THREE.Color(colorPalette[randomColorIndex][6]),
          },

          uEdgeBlur: { value: debugObject.edgeBlur },
          uUvRotation: { value: 2 },

          uResolution: { value: new THREE.Vector2(sizes.width, sizes.height) },

          uRandom: { value: Math.random() },
        },
      })
    )
    this.bubble.rotation.y = -Math.PI / 2
    scene.add(this.bubble)
  }

  setBubbleTopLayer() {
    this.bubbleTopLayer = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: bubbleTopLayerVertexShader,
        fragmentShader: bubbleTopLayerFragmentShader,
        transparent: true,

        uniforms: {
          uTime: { value: 0 },
          uCloudsColor: { value: new THREE.Color(debugObject.cloudsColor) },
          uEdgeBlur: { value: debugObject.edgeBlur },
          uUvRotation: { value: 6 },
          uAmplitude: { value: 0.5 },
        },
      })
    )
    scene.add(this.bubbleTopLayer)
  }

  update(elapsedTime) {
    this.bubble.material.uniforms.uTime.value = elapsedTime
    this.bubbleTopLayer.material.uniforms.uTime.value = elapsedTime
  }

  setTweaks() {
    // bubbleFolder
    //   .addInput(debugObject, "edgeBlur", {
    //     min: 1,
    //     max: 5,
    //     step: 0.01,
    //     label: "Edge Blur",
    //   })
    //   .on("change", (ev) => {
    //     //Not really necessary
    //     this.bubble.material.uniforms.uEdgeBlur.value = ev.value
    //     this.bubbleTopLayer.material.uniforms.uEdgeBlur.value = ev.value
    //   })

    bubbleFolder.addInput(this.bubble.material.uniforms.uUvRotation, "value", {
      min: 0,
      max: 10,
      step: 0.01,
      label: "Bubble Uv Rotation",
    })

    // cloudsFolder.addInput(debugObject, "cloudsColor").on("change", (ev) => {
    //   this.bubbleTopLayer.material.uniforms.uCloudsColor.value =
    //     new THREE.Color(ev.value)
    // })

    // cloudsFolder.addInput(
    //   this.bubbleTopLayer.material.uniforms.uAmplitude,
    //   "value",
    //   {
    //     min: 0,
    //     max: 1,
    //     step: 0.01,
    //     label: "Cloud opacity",
    //   }
    // )

    // cloudsFolder.addInput(
    //   this.bubbleTopLayer.material.uniforms.uUvRotation,
    //   "value",
    //   {
    //     min: 0,
    //     max: 10,
    //     step: 0.01,
    //     label: "Clouds Uv Rotation",
    //   }
    // )
  }
}
