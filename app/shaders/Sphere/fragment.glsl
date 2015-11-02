// varying vec2 vUv;
// varying float noise;
// uniform float time;
// uniform vec2 resolution;
//
// void main() {
//
//     // vec2 uv = vec2(gl_FragCoord.xy / resolution);
//     vec2 uv = vUv;
//
//     float angle = 0.0;
//     float radius = length(uv);
//
//     if ( uv.x != 0.0 && uv.y != 0.0 ) {
//       angle = degrees(atan(uv.x, uv.y));
//     }
//
//     float amod = mod(angle+30.0 * time - 120.0 * log(radius), 30.0);
//     vec3 color = vec3(amod < 15.0 ? 1.0 : 0.0);
//
//     float reduction = 10.0;
//
//     // if( color.r == 1.0 ) {
//     //   color = vec3( 0.69, 1.0, 0.74 );
//     // } else {
//     //   color = vec3( mix( color, vec3( 0.0, 1.0, 0.0 ), .05 ) );
//     // }
//     // RGB(175, 255, 188)
//     // CGColorCreateGenericRGB(0.69, 1, 0.74, 1)
//     color = vec3( 0.69, 1.0, 0.74 ) * color.r + vec3( mix( color, vec3( 0.7, 1.0, 0.7 ), .05 ) ) * ( 1.0 - color.r );
//     // color = vec3( 0.0, 0.5, 0.0 ) * color.r + vec3( mix( color, vec3( 0.0, 1.0, 0.0 ), .05 ) ) * ( 1.0 - color.r );
//     color = mix(color, color * noise, 0.5);
//     //
//     // color = vec3( 0.69, 1.0, 0.74 ) * 0.5 + color.g + color * ( 0.5 - color.g );
//
//     // compose the colour using the UV coordinate
//     // and modulate it with the noise like ambient occlusion
//     // vec3 color = vec3( vUv * ( 1. - 2. * noise ), 0.5 );
//
//     // gl_FragColor = vec4( color, 1.0 ) + vec4( 0, 0.15, 0, 0 );
//     // gl_FragColor = vec4( mix( color, vec3( 0.0, 0.5, 0.0 ), .85 ), 1.0 );
//     gl_FragColor = vec4( color, 1.0 );
//
// }

varying vec2 vUv;
varying float noise;

void main() {

    // // vec2 uv = vec2(gl_FragCoord.xy / resolution);
    // vec2 uv = vUv;
    //
    // float angle = 0.0;
    // float radius = length(uv);
    //
    // // if ( uv.x != 0.0 && uv.y != 0.0 ) {
    // //   angle = degrees(atan(uv.x, uv.y));
    // // }
    //
    // float amod = mod(angle+30.0 * time - 120.0 * log(radius), 30.0);
    // vec3 color = vec3(amod < 15.0 ? 1.0 : 0.0);
    //
    // float reduction = 10.0;

    // if( color.r == 1.0 ) {
    //   color = vec3( 0.0, 0.5, 0.0 );
    // } else {
    //   color = vec3( mix( color, vec3( 0.0, 1.0, 0.0 ), .05 ) );
    // }

    // color = vec3( 0.69, 1.0, 0.74 ) * color.r + vec3( mix( color, vec3( 0.7, 1.0, 0.7 ), .05 ) ) * ( 1.0 - color.r );
    // color = vec3( 0.0, 0.5, 0.0 ) * color.r + vec3( mix( color, vec3( 0.0, 1.0, 0.0 ), .05 ) ) * ( 1.0 - color.r );
    // color = vec3(color.r * (noise * reduction), color.g * (noise * reduction), color.b * (noise * reduction));

    // color = vec3( 0.69, 1.0, 0.74 ) * color.r + color * ( 1.0 - color.r );

    // compose the colour using the UV coordinate
    // and modulate it with the noise like ambient occlusion
    vec3 color = vec3( vUv * ( 1. - 2. * (noise * 0.1) ), 0.5 );
    gl_FragColor = vec4( vec3(color.r + 0.3, color.g + 0.3, color.b + 0.3 ), 1.0 );

}
