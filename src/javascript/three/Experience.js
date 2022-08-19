import * as THREE from "three"
import Stats from "stats.js"

import { Camera } from "./Camera"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"
import { Loaders } from "./Loaders"
import { Floor } from "./Floor"
import { Pane } from "tweakpane"
import { Lights } from "./Lights"
import { Environment } from "./Environment"
import { Bubble } from "./Bubbles"
import { Background } from "./Background"

export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const pane = new Pane()

export const bubbleFolder = pane.addFolder({
  title: "Bubble",
})
export const cloudsFolder = pane.addFolder({
  title: "Clouds",
})

export const debugObject = {
  edgeBlur: 2,
  cloudsColor: "#FEFCFF",
}

// const stats = new Stats()
// stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom)

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()

export const loaders = new Loaders()

export const environment = new Environment()

export const lights = new Lights()

// export const floor = new Floor()

export const sizes = new Sizes()

export const bubble = new Bubble()

export const backgroud = new Background()

export const camera = new Camera()

export const renderer = new Renderer()

//Animate
const clock = new THREE.Clock()
let oldElapsedTime = 0

const tick = () => {
  // stats.begin()

  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - oldElapsedTime
  oldElapsedTime = elapsedTime

  bubble.update(elapsedTime)

  // Update controls
  // camera.controls.update()
  camera.update()

  // Render
  renderer.renderer.render(scene, camera.camera)

  // setTimeout(() => {
  window.requestAnimationFrame(tick)
  // }, 1000 / 60)

  // stats.end()
}

tick()
