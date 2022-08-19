uniform float uTime;

uniform vec3 uCloudsColor;

uniform float uEdgeBlur;
uniform float uUvRotation;
uniform float uAmplitude;

float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
float noise(vec2 x) {
	vec2 i = floor(x);
	vec2 f = fract(x);
	float a = hash(i);
	float b = hash(i + vec2(1.0, 0.0));
	float c = hash(i + vec2(0.0, 1.0));
	float d = hash(i + vec2(1.0, 1.0));
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm (in vec2 p, in int octaves) {

    float value = 0.0;
    float freq = 1.0;
    float amp = 0.5;    

    for (int i = 0; i < octaves; i++) {
        value += amp * (noise((p - vec2(1.0)) * freq));
        freq *= 1.9;
        amp *= 0.6;
    }
    return value;
}

float pattern(in vec2 p, in int octaves) {
    vec2 offset = vec2(-0.5);

    float time = uTime * 2.0;

    vec2 aPos = vec2(sin(time * 0.005), sin(time * 0.01)) * 4.0;
    // vec2 aScale = vec2(3.0);
    vec2 aScale = vec2(1.2);
    float a = fbm(p * aScale + aPos, octaves);

    vec2 bPos = vec2(sin(time * 0.01), sin(time * 0.01)) * 4.0;
    // vec2 bScale = vec2(0.8);
    vec2 bScale = vec2(1.2);
    float b = fbm((p + a) * bScale + bPos, octaves);

    vec2 cPos = vec2(-0.6, -0.5) + vec2(sin(-time * 0.001), sin(time * 0.01)) * 4.0;
    // vec2 cScale = vec2(2.6);
    vec2 cScale = vec2(1.2);
    float c = fbm((p + b) * cScale + cPos, octaves);
    return c;
}

#define PI 3.1415926538

vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    vec2 centeredUv = vUv - 0.5;
    float distanceToCenter = length(centeredUv);
    float radialRatio = atan(centeredUv.x, centeredUv.y) / PI + 0.5;

    vec2 distortedUv = rotate(centeredUv, distanceToCenter * uUvRotation) + uTime * 0.001;

    vec3 viewDirection = normalize(cameraPosition - vPosition);
	float fresnelTerm = dot(viewDirection, vNormal);
	fresnelTerm = clamp(fresnelTerm, 0.0, 1.0) * 1.5;

    float cloudNoise = pattern(distortedUv * 10.0, 6) * 1.5;

    gl_FragColor = vec4(uCloudsColor * pow(fresnelTerm, uEdgeBlur), cloudNoise * 0.4);
}