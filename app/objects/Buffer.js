import THREE from 'three';
const glslify = require('glslify');

const start = Date.now();

export default class Buffer extends THREE.Object3D {
  constructor() {
    super();

    // this.geom = new THREE.PlaneGeometry( 35, 25, 42 );
    this.geom = new THREE.BufferGeometry();

/*eslint-disable */
    const vertexPositions = [
      [-1.0, -1.0,  1.0],
      [ 1.0, -1.0,  1.0],
      [ 1.0,  1.0,  1.0],
      [ 1.0,  1.0,  1.0],
      [-1.0,  1.0,  1.0],
      [-1.0, -1.0,  1.0],
    ];
/*eslint-enable */
    const vertices = new Float32Array( vertexPositions.length * 3 );

    for ( let i = 0; i < vertexPositions.length; i++ ) {
      vertices[ i * 3 + 0 ] = vertexPositions[i][0];
      vertices[ i * 3 + 1 ] = vertexPositions[i][1];
      vertices[ i * 3 + 2 ] = vertexPositions[i][2];
    }

    this.geom.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    this.geom.computeVertexNormals();
    this.geom.computeFaceNormals();
    this.mat = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
    // this.mat = new THREE.MeshBasicMaterial({
    //   color: 0x00aaff,
    //   wireframe: true,
    // });

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.scale.set(10, 10, 10);
    this.rotation.x = 0.5;
    this.rotation.y = 0.5;

    // this.rotation.x = 0.5;
    // this.rotation.z = 0.5;
    console.log(this.geom.vertices);
    this.add(this.mesh);
  }

  update() {
    // this.mat.uniforms.time.value = 0.00025 * ( Date.now() - start );
    // this.geom.vertices;
    //
    // this.rotation.x += 0.01;
    // this.rotation.z += 0.01;
  }
}
