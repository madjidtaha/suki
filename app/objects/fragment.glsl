// varying vec2 vUv;
// varying float noise;
//
// void main() {
//
//     // compose the colour using the UV coordinate
//     // and modulate it with the noise like ambient occlusion
//     vec3 color = vec3( vUv * ( 1. - 2. * noise ), 0.5 );
//     gl_FragColor = vec4( color.rgb, 1.0 );
//
// }
varying vec2 vUv;
varying float noise;
uniform float time;
uniform vec2 resolution;

void main() {

    // vec2 uv = vec2(gl_FragCoord.xy / resolution);
    vec2 uv = vUv;

    float angle = 0.0;
    float radius = length(uv);

    if ( uv.x != 0.0 && uv.y != 0.0 ) {
      angle = degrees(atan(uv.x, uv.y));
    }

    float amod = mod(angle+30.0 * time - 120.0 * log(radius), 30.0);
    vec3 color = vec3(amod < 20.0 ? 1.0 : 0.1);

    float reduction = 5.0;

    color = vec3(color.r * (noise * reduction), color.g * (noise * reduction), color.b * (noise * reduction));

    // compose the colour using the UV coordinate
    // and modulate it with the noise like ambient occlusion
    // vec3 color = vec3( vUv * ( 1. - 2. * noise ), 0.5 );
    gl_FragColor = vec4( color, 1.0 );

}

//
// varying vec2 vUv;
// varying float noise;
// uniform sampler2D tExplosion;
//
// float random( vec3 scale, float seed ){
//     return fract( sin( dot( gl_FragCoord.xyz + seed, scale ) ) * 43758.5453 + seed ) ;
// }
//
// void main() {
//
//     // get a random offset
//     float r = .01 * random( vec3( 12.9898, 78.233, 151.7182 ), 0.0 );
//     // lookup vertically in the texture, using noise and offset
//     // to get the right RGB colour
//     vec2 tPos = vec2( 0, 1.0 - 1.3 * noise + r );
//     vec4 color = texture2D( tExplosion, tPos );
//
//     gl_FragColor = vec4( color.rgb, 1.0 );
//
// }
