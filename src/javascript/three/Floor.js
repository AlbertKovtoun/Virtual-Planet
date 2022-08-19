import * as THREE from "three"
import CANNON from "cannon"
import { physics, scene } from "./Experience"

export class Floor {
  constructor() {
    this.setFloor()
  }

  setFloor() {
    this.floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshBasicMaterial({ color: "white" })
    )
    this.floor.rotation.x = -Math.PI / 2
    scene.add(this.floor)
  }
}
