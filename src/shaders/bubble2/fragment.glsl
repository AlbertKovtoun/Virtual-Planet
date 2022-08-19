uniform float uTime;

uniform vec3 uColorBackground;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform vec3 uColor6;

uniform float uEdgeBlur;
uniform float uUvRotation;

uniform vec2 uResolution;

uniform float uRandom;

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

    vec2 aPos = vec2(sin(time * 0.005), sin(time * 0.01)) * 0.8;
    // vec2 aScale = vec2(3.0);
    vec2 aScale = vec2(3.0);
    float a = fbm(p * aScale + aPos, octaves);

    vec2 bPos = vec2(sin(time * 0.01), sin(time * 0.01)) * 0.8;
    // vec2 bScale = vec2(0.8);
    vec2 bScale = vec2(2.0);
    float b = fbm((p + a) * bScale + bPos, octaves);

    vec2 cPos = vec2(-0.6, -0.5) + vec2(sin(-time * 0.001), sin(time * 0.01)) * 0.8;
    // vec2 cScale = vec2(2.6);
    vec2 cScale = vec2(1.0);
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

float rand(float n){return fract(sin(n) * 43758.5453123);}

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vPos;

void main()
{
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vPosition);

    vec2 centeredUv = vUv - 0.5;
    float distanceToCenter = length(centeredUv);
    float radialRatio = atan(centeredUv.x, centeredUv.y) / PI + 0.5;

    vec2 distortedUv = rotate(centeredUv, distanceToCenter * uUvRotation) + uTime * 0.005;

    float frequency = 8.0;
    int details = 6; 

    float fbm = pattern(distortedUv * frequency + uRandom * 100.0, details);

    float outlineNoise = step(0.6, fbm);
    vec3 color1 = mix(uColorBackground, uColor1, outlineNoise);

    float noise1 = smoothstep(0.61, 0.65, fbm);
    vec3 color2 = mix(color1, uColor2, noise1); 

    float noise2 = smoothstep(0.66, 0.71, fbm);
    vec3 color3 = mix(color2, uColor3, noise2); 

    float noise3 = smoothstep(0.72, 0.77, fbm);
    vec3 color4 = mix(color3, uColor4, noise3); 

    float noise4 = smoothstep(0.78, 0.83, fbm);
    vec3 color5 = mix(color4, uColor5, noise4); 

    float noise5 = smoothstep(0.84, 0.89, fbm);
    vec3 color6 = mix(color5, uColor6, noise5); 

    //Normals (looks pretty shit imo)
    vec3 pixel = vec3(0.5 / uResolution, 0.0);

    // float s1 = pattern(distortedUv * frequency + pixel.xy, 6);
    // float s2 = pattern(distortedUv * 2.0 - pixel.xy, 12);
    // float s3 = pattern(distortedUv * 2.0 + pixel.yx, 12);
    // float s4 = pattern(distortedUv * 2.0 - pixel.yx, 12);

    // vec3 normal = normalize(vec3(s1 - s2, s3 - s4, 0.001));

    //Lighting

    //Ambient lighting
    vec3 ambient = vec3(0.5);

    // Diffuse lighting
    vec3 lightDir = normalize(vec3(1.0, 0.0, -1.0));
    vec3 lightColour = vec3(1.0, 1.0, 1.0);
    float dp = max(0.0, dot(lightDir, normal));

    vec3 diffuse = dp * lightColour;

    // Phong specular
    // vec3 r = normalize(reflect(-lightDir, normal));
    vec3 r = normalize(reflect(lightDir, normal));
    float phongValue = max(0.0, dot(viewDir, r));
    phongValue = pow(phongValue, 4.0) * 0.2;

    vec3 specular = vec3(phongValue);

    // Fresnel
    float fresnel = 1.0 - max(0.0, dot(viewDir, normal));
    fresnel = pow(fresnel, 2.0);

    specular *= fresnel;

    vec3 lighting = ambient * 1.0 + diffuse;

    vec3 color = color6 * lighting + specular;

    // gl_FragColor = vec4(vUv, 1.0,  1.0);
    gl_FragColor = vec4(color, 1.0);
}