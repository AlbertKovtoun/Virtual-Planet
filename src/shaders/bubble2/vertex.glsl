varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;

    vec4 projectedPosition = projectionMatrix * viewPosition;

    // vPosition = vec3( vec4( position, 1.0 ) * modelMatrix);
	vNormal = normalize(vec3(vec4(normal, 0.0) * modelMatrix));

    gl_Position = projectedPosition;

    vUv = uv;
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
}