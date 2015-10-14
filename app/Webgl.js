import Sphere from './objects/Sphere';
import Buffer from './objects/Buffer';
import Plane from './objects/Plane';
import THREE from 'three';
import Sound from './core/Sound';
window.THREE = THREE;

const OrbitControls = require('three-orbit-controls')(THREE);

export default class Webgl {
  constructor(width, height) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(15, width / height, 1, 1000);
    // this.camera.position.z = 550;
    this.camera.position.y = 550;
    this.camera.position.z = 550;
    this.camera.rotation.x = -1;

    // this.controls = new OrbitControls(this.camera);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    this.renderer.setClearColor(0x292929);

    this.usePostprocessing = false;
    this.composer = new WAGNER.Composer(this.renderer);
    this.composer.setSize(width, height);
    this.initPostprocessing();

    this.sphere = new Sphere();
    this.plane = new Plane();
    this.buffer = new Buffer();
    this.sphere.position.set(0, -10, 0);
    // this.plane.position.set(0, -70, 0);
    this.plane.position.set(20, -70, 0);
    this.scene.add(this.sphere);
    // this.scene.add(this.plane);
    // this.scene.add(this.buffer);

    const music = Math.floor(Math.random() * 2 + 1.5);

    Sound.load(`/assets/mp3/0${music}.mp3`);
  //
    Sound.on('start', () => console.log('BLAA'));

    TweenMax.to(this.camera.position, 2, {
      y: 0,
      delay: 0.5,
      ease: Power4.easeOut,
    });

    TweenMax.to(this.camera.rotation, 2, {
      x: 0,
      delay: 0.5,
    });
  }

  initPostprocessing() {
    // if (!this.usePostprocessing) return;

    this.useAsciiPass = false;

    this.vignette2Pass = new WAGNER.Vignette2Pass();
    this.asciiPass = new WAGNER.ASCIIPass();
    this.multiPassBloomPass = new WAGNER.MultiPassBloomPass();
    this.fxaaPass = new WAGNER.FXAAPass();

  }

  resize(width, height) {
    this.composer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);

  }

  render(ts) {

    if (this.usePostprocessing) {
      this.composer.reset();
      this.composer.renderer.clear();
      this.composer.render(this.scene, this.camera);
      if (this.useAsciiPass) this.composer.pass(this.asciiPass);
      this.composer.pass(this.vignette2Pass);
      this.composer.pass(this.fxaaPass);
      // this.composer.pass(this.multiPassBloomPass);
      this.composer.toScreen();
    } else {
      this.renderer.autoClear = false;
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    }
    // console.log(Sound.getData().freq, Sound.getData().time);

    let freq = 0;
    let time = 0;
    const freqArray = Sound.getData().freq;
    const freqLength = Sound.getData().freq.length;

    for (let i = 0; i < freqLength; i++) {
      freq += freqArray[i];
    }
    freq /= freqLength;

    const timeArray = Sound.getData().time;
    const timeLength = Sound.getData().time.length;

    for (let i = 0; i < timeLength; i++) {
      time += timeArray[i];
    }
    time /= timeLength;

    // console.log('Audio', time, freq);

    // if (ts > 24000) debugger;

    this.sphere.update(ts, {freq, time});
    // this.plane.update(ts);
    // this.buffer.update();
  }
}
