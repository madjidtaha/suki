import THREE from 'three';
const glslify = require('glslify');

const start = Date.now();

export default class Sphere extends THREE.Object3D {
  constructor() {
    super();

    // this.geom = new THREE.PlaneGeometry( 35, 25, 42 );
    this.geom = new THREE.IcosahedronGeometry( 15, 2 );
    this.mat = new THREE.ShaderMaterial( {
      uniforms: {
        tExplosion: {
          type: 't',
          value: THREE.ImageUtils.loadTexture( 'explosion.png' ),
        },
        time: { // float initialized to 0
          type: 'f',
          value: 0.0,
        },
      },
      vertexShader: glslify('./vertex.glsl'),
      fragmentShader: glslify('./fragment.glsl'),
      wireframe: true,
    });
    // this.mat = new THREE.MeshBasicMaterial({
    //   color: 0x00aaff,
    //   wireframe: true,
    // });
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    // this.rotation.x = 0.5;
    // this.rotation.z = 0.5;
    console.log(this.geom.vertices);
    this.add(this.mesh);
  }

  update() {
    this.mat.uniforms.time.value = 0.00025 * ( Date.now() - start );
    // this.geom.vertices;
    //
    // this.rotation.x += 0.01;
    // this.rotation.z += 0.01;
  }
}
