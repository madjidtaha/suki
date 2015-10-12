import Sphere from './objects/Sphere';
import THREE from 'three';
import Sound from './core/Sound';
window.THREE = THREE;

export default class Webgl {
  constructor(width, height) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x292929);

    this.usePostprocessing = true;
    this.composer = new WAGNER.Composer(this.renderer);
    this.composer.setSize(width, height);
    this.initPostprocessing();

    this.sphere = new Sphere();
    this.sphere.position.set(0, 0, 0);
    this.scene.add(this.sphere);

    Sound.load('/assets/mp3/glencheck_paintitgold.mp3');

    Sound.on('start', () => console.log('BLAA'));
  }

  initPostprocessing() {
    // if (!this.usePostprocessing) return;

    this.useAsciiPass = false;

    this.vignette2Pass = new WAGNER.Vignette2Pass();
    this.asciiPass = new WAGNER.ASCIIPass();
    this.multiPassBloomPass = new WAGNER.MultiPassBloomPass();
  }

  resize(width, height) {
    this.composer.setSize(width, height);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  render() {
    if (this.usePostprocessing) {
      this.composer.reset();
      this.composer.renderer.clear();
      this.composer.render(this.scene, this.camera);
      this.composer.pass(this.vignette2Pass);
      if (this.useAsciiPass) this.composer.pass(this.asciiPass);
      // this.composer.pass(this.multiPassBloomPass);
      this.composer.toScreen();
    } else {
      this.renderer.autoClear = false;
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    }
    // console.log(Sound.getData().freq, Sound.getData().time);

    this.sphere.update();
  }
}
