import * as THREE from "three"
import { scene } from "./Experience"

export class Grain {
  constructor() {
    this.setGrain()
  }

  setGrain() {
    this.grain = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5, 1, 1),
      new THREE.ShaderMaterial({
        transparent: true,

        uniforms: {
          uTime: { value: 0 },
          uGrainStrength: { value: 20 },
        },

        vertexShader: `

            varying vec2 vUv;

            void main()
            {
                gl_Position = vec4(position, 1.0);

                vUv = uv;
            }
        `,
        fragmentShader: `

            uniform float uTime;
            uniform float uGrainStrength;

            varying vec2 vUv;

            void main()
            {

                vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

                float strength = uGrainStrength;

                float x = (vUv.x + 4.0 ) * (vUv.y + 4.0 ) * (uTime * 10.0);
	            vec4 grain = vec4(mod((mod(x, 13.0) + 1.0) * (mod(x, 123.0) + 1.0), 0.01)-0.005) * strength;
            
                // grain = 1.0 - grain;
                gl_FragColor = color * grain;

                // gl_FragColor = vec4(vUv, 1.0, 0.5);
            }
        `,
      })
    )
    //Render last just like a pass?
    scene.add(this.grain)
  }

  update(elapsedTime) {
    this.grain.material.uniforms.uTime.value = elapsedTime
  }
}
