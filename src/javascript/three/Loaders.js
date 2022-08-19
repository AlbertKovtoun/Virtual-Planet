import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export class Loaders {
  constructor() {
    this.loadingManager = new THREE.LoadingManager(() => {})

    this.textureLoader = new THREE.TextureLoader()

    this.cubeTextureLoader = new THREE.CubeTextureLoader()

    this.gltfLoader = new GLTFLoader()
  }
}
