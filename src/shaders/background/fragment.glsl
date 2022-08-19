uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec2 vUv;
varying vec3 vNormal;

void main()
{
    float strength = vNormal.y;

    vec3 color = mix(uColor1, uColor2, strength);

    gl_FragColor = vec4(color, 1.0);
}