import THREE from 'three';
const glslify = require('glslify');

const start = Date.now();
const stripeSize = 30;
const scaleValue = 1;

export default class Sphere extends THREE.Object3D {
  constructor() {
    super();

    this.stripeCurr = stripeSize;
    this.scaleCurr = scaleValue;
    this.stripesCurr = scaleValue;

    // this.geom = new THREE.PlaneGeometry( 35, 25, 42 );
    // this.sphereGeometry = new THREE.IcosahedronGeometry( 25, 4 );
    this.sphereGeometry = new THREE.SphereGeometry( 35, 100, 100 );
    // this.stripesGeometry = new THREE.IcosahedronGeometry( 45, 4 );
    this.stripesGeometry = new THREE.SphereGeometry( 45, 200, 200 );
    this.sphereMaterial = new THREE.ShaderMaterial( {
      uniforms: {
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
    this.stripesMaterial = new THREE.ShaderMaterial( {
      uniforms: {
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
        stripe: {
          type: 'f',
          value: 15.0,
        },
      },
      vertexShader: glslify('../shaders/Stripes/vertex.glsl'),
      fragmentShader: glslify('../shaders/Stripes/fragment.glsl'),
      // wireframe: true,
      transparent: true,
      // depthTest: false,
      side: THREE.DoubleSide,
    });

    // this.mat = new THREE.MeshBasicMaterial({
    //   color: 0x00aaff,
    //   wireframe: true,
    // });

    this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
    this.stripesMesh = new THREE.Mesh(this.stripesGeometry, this.stripesMaterial);
    // this.rotation.x = 0.5;
    // this.rotation.z = 0.5;
    // console.log(this.geom.vertices);
    this.add(this.sphereMesh);
    this.add(this.stripesMesh);
  }

  update(ts, sound) {
    const freq = sound.freq.low.value;
    const time = sound.time.low.value;

    // const freq = sound.freq.medium.value;
    // const time = sound.time.medium.value;

    const currentTime = 0.00025 * ( Date.now() - start );
    // console.log('time, freq', time, freq);
    this.sphereMaterial.uniforms.time.value = currentTime;
    this.sphereMaterial.uniforms.soundFreq.value = freq;
    this.sphereMaterial.uniforms.soundTime.value = time;


    this.stripesMaterial.uniforms.time.value = currentTime;
    this.stripesMaterial.uniforms.soundFreq.value = freq;
    this.stripesMaterial.uniforms.soundTime.value = time;

    let stripeDest = stripeSize;
    stripeDest *= (freq + time);
    let intensity = ((stripeDest - 22) / 10 ) > 1 ? 1 : ((stripeDest - 22) / 10 );
    intensity = intensity < 0.3 ? 0.3 : intensity;

    stripeDest = (stripeDest > 20.0) ? 20.0 : stripeDest;
    stripeDest = (stripeDest < 2.0) ? 2.0 : stripeDest;


    this.stripeCurr += ( stripeDest - this.stripeCurr ) * 0.8;
    // FIXME Really ugly
    window.light.color.setRGB(intensity, intensity, intensity);
    console.log(intensity);
    if (!window.isPlaying) this.stripeCurr = 0;
    this.stripesMaterial.uniforms.stripe.value = this.stripeCurr;

    const scaleDest = 1.2 * (freq + time);
    const stripesDest = 1.5 * (freq + time);
    this.scaleCurr += ( scaleDest - this.scaleCurr ) * 0.1;
    this.stripesCurr += ( stripesDest - this.stripesCurr ) * 0.15;
    // console.log(this.scaleCurr);
    if (this.scaleCurr) this.sphereMesh.scale.set(this.scaleCurr, this.scaleCurr, this.scaleCurr);
    if (this.stripesCurr) this.stripesMesh.scale.set(this.stripesCurr, this.stripesCurr, this.stripesCurr);
    // console.log('mesh ', this.mesh.scale.x);
    // this.mat.uniforms.time.value = 0.00025 * ( Date.now() - start );
    // this.geom.vertices;
    //
    // this.rotation.x += 0.01;
    // this.rotation.z += 0.01;
  }
}
