import THREE from 'three';
const glslify = require('glslify');

const start = Date.now();

export default class Sphere extends THREE.Object3D {
  constructor() {
    super();

    // this.geom = new THREE.PlaneGeometry( 35, 25, 42 );
    this.geom = new THREE.IcosahedronGeometry( 35, 4 );
    this.mat = new THREE.ShaderMaterial( {
      uniforms: {
        tExplosion: {
          type: 't',
          value: THREE.ImageUtils.loadTexture( 'assets/textures/explosion.png' ),
        },
        time: { // float initialized to 0
          type: 'f',
          value: 0.0,
        },
        soundFreq: { // float initialized to 0
          type: 'f',
          value: 0.0,
        },
        soundTime: { // float initialized to 0
          type: 'f',
          value: 0.0,
        },
        resolution: { // float initialized to 0
          type: 'v2',
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: glslify('../shaders/Sphere/vertex.glsl'),
      fragmentShader: glslify('../shaders/Sphere/fragment.glsl'),
      // wireframe: true,
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

  update(ts, sound) {
    const freq = sound.freq / 256;
    const time = sound.time / 256;
    console.log('time, freq', time, freq);
    this.mat.uniforms.time.value = 0.00025 * ( Date.now() - start );
    this.mat.uniforms.soundFreq.value = freq;
    this.mat.uniforms.soundTime.value = time;
    // if (freq) this.mesh.scale.set(2 * (freq + time) * 2, 2 * (freq + time) * 2, 2 * (freq + time) * 2);
    // console.log('mesh ', this.mesh.scale.x);
    // this.mat.uniforms.time.value = 0.00025 * ( Date.now() - start );
    // this.geom.vertices;
    //
    // this.rotation.x += 0.01;
    // this.rotation.z += 0.01;
  }
}
