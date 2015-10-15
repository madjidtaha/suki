import THREE from 'three';
const glslify = require('glslify');

export default class Light extends THREE.DirectionalLight {
  constructor() {
    super(0xFFFFFF, 1);
    // this.position.set( 0, 1, 0 );
    this.position.set(435, 23, 336);
    this.castShadow = true;
    this.receiveShadow = true;

    this.castShadow = true;
    this.shadowCameraVisible = true;
  }

  update(ts) {

  }
}
