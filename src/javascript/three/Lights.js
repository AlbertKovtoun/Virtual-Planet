import * as THREE from "three"

import { scene } from "./Experience"

export class Lights {
  constructor() {
    this.setLights()
  }

  setLights() {
    this.al = new THREE.AmbientLight(0xffffff, 2)
    scene.add(this.al)

    this.pl = new THREE.PointLight(0xffffff, 2)
    this.pl.position.set(10, 1, 0)
    scene.add(this.pl)
  }
}
