import THREE from 'three';
const glslify = require('glslify');

const start = Date.now();

export default class Plane extends THREE.Object3D {
  constructor() {
    super();

    // this.geom = new THREE.PlaneGeometry( 35, 25, 42 );
    this.geom = new THREE.PlaneGeometry(100, 100, 20, 20);
    this.mat = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    // this.mat = new THREE.ShaderMaterial( {
    //   uniforms: {
    //     time: { // float initialized to 0
    //       type: 'f',
    //       value: 0.0,
    //     },
    //     resolution: { // float initialized to 0
    //       type: 'v2',
    //       value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    //     },
    //   },
    //   vertexShader: glslify('./vertex.glsl'),
    //   fragmentShader: glslify('./fragment.glsl'),
    //   // wireframe: true,
    // });
    // this.mat = new THREE.MeshBasicMaterial({
    //   color: 0x00aaff,
    //   wireframe: true,
    // });
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    // this.rotation.x = 0.5;
    // this.rotation.z = 0.5;

    this.mesh.rotation.x = -0.3 * Math.PI;
    // this.mesh.position.set(0, 90, 100);

    console.log(this.geom.vertices);
    this.add(this.mesh);
    console.log('create');
  }

  update(ts) {
    // console.log(ts);
    // this.mat.uniforms.time.value = 0.00025 * ( Date.now() - start );
    const center = new THREE.Vector2(0, 0);
    // requestAnimationFrame(this.update);
    const vLength = this.geom.vertices.length;
    for (let i = 0; i < vLength; i++) {
      const v = this.geom.vertices[i];
      const dist = new THREE.Vector2(v.x, v.y).sub(center);
      const size = 5.0;
      const magnitude = 4;
      v.z = Math.sin(dist.length() / -size + (ts / 500)) * magnitude;
    }
    this.geom.verticesNeedUpdate = true;
    // this.geom.vertices;
    //
    // this.rotation.x += 0.01;
    // this.rotation.z += 0.01;
  }
}
