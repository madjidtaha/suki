#pragma glslify: hsv2rgb = require(glsl-hsv2rgb)

varying vec2 vUv;
// varying float noise;
uniform float time;
uniform vec2 resolution;
uniform float soundFreq;
uniform float soundTime;
uniform float stripe;

void main() {

    // vec2 uv = vec2(gl_FragCoord.xy / resolution);
    vec2 uv = vUv;

    float angle = 0.0;
    float radius = length(uv);

    if ( uv.x != 0.0 && uv.y != 0.0 ) {
      angle = degrees(atan(uv.x, uv.y));
    }

    float striptSize = 360.0 * soundFreq;
    float amod = mod(30.0 * time - striptSize * log(radius), 30.0);

    vec3 color = vec3(amod < stripe ? 1.0 : 0.0);
    if (gl_FrontFacing) {
      // F86274
      // CF5261
      gl_FragColor = vec4( vec3(0.97, 0.38, 0.45), 1.0 - color.r );
    }
    else {
      vec3 hsvColor = hsv2rgb(vec3(soundFreq));
      // CGColorCreateGenericRGB(0.69, 1, 0.74, 1)
      // 0,195/255,255
      // 180,99,166
      // 92,73,120
      hsvColor = mix(hsvColor, vec3(0.7, 0.38, 0.65), 0.3);
      gl_FragColor = vec4(hsvColor, 1.0 - color.r );
    }

}
