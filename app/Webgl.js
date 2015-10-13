import Sphere from './objects/Sphere';
import Buffer from './objects/Buffer';
import Plane from './objects/Plane';
import THREE from 'three';
import Sound from './core/Sound';
window.THREE = THREE;

export default class Webgl {
  constructor(width, height) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(90, width / height, 1, 1000);
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    this.renderer.setClearColor(0x292929);

    this.usePostprocessing = true;
    this.composer = new WAGNER.Composer(this.renderer);
    this.composer.setSize(width, height);
    this.initPostprocessing();

    this.sphere = new Sphere();
    this.plane = new Plane();
    this.buffer = new Buffer();
    this.sphere.position.set(0, 0, 0);
    this.scene.add(this.sphere);
    // this.scene.add(this.plane);
    // this.scene.add(this.buffer);

    Sound.load('/assets/mp3/vivalditraplord.mp3');
  //
    Sound.on('start', () => console.log('BLAA'));
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

    this.sphere.update();
    this.plane.update(ts);
    // this.buffer.update();
  }
}
