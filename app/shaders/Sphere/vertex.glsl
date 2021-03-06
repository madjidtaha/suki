#pragma glslify: pnoise = require(glsl-noise/periodic/3d)
//
// varying vec2 vUv;
// varying float noise;
// uniform float time;
//
// float turbulence( vec3 p ) {
//     float w = 100.0;
//     float t = -.5;
//     for (float f = 1.0 ; f <= 10.0 ; f++ ){
//         float power = pow( 2.0, f );
//         t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
//     }
//     return t;
// }
//
// void main() {
//
//     vUv = uv;
//
//     // add time to the noise parameters so it's animated
//     noise = 5.0 *  -.10 * turbulence( .5 * normal + time );
//     float b = 5.0 * pnoise( 0.05 * position + vec3( 2.0 * time ), vec3( 100.0 ) );
//     float displacement = - noise + b;
//
//     vec3 newPosition = position + normal * displacement;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
//
// }
//
varying vec2 vUv;
varying float noise;
uniform float time;
uniform float soundTime;
uniform float soundFreq;

float turbulence( vec3 p ) {
    float w = 100.0;
    float t = -.5;
    for (float f = 1.0 ; f <= 10.0 ; f++ ){
        float power = pow( 2.0, f );
        t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
    }
    return t;
}

void main() {

    vUv = uv;

    // add time to the noise parameters so it's animated
    // Note pour plus tard, @vdaguenet m'a dit de m'amuser avec 10.0 et 15.0
    noise = ( 10.0 * (soundTime + 0.5) ) *  -.10 * turbulence( .5 * normal + time );
    float b = ( 15.0 * (soundFreq + 0.5) ) * pnoise( 0.05 * position + vec3( 2.0 * time ), vec3( 100.0 ) );
    float displacement = - noise + b;

    vec3 newPosition = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

}
