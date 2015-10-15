import Sphere from './objects/Sphere';
import Buffer from './objects/Buffer';
import Plane from './objects/Plane';
import Light from './objects/Light';
import THREE from 'three';
import Sound from './core/Sound';
window.THREE = THREE;

const OrbitControls = require('three-orbit-controls')(THREE);

export default class Webgl {
  constructor(width, height) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(15, width / height, 1, 1000);
    // this.camera.position.y = 550;
    this.camera.position.set(435, 23, 336);
    this.camera.rotation.set(0, 1, 0);
    this.light = new Light();
    window.light = this.light;
    // this.camera.rotation.x = -1;

    this.controls = new OrbitControls(this.camera);

    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvas'),
    });

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    this.renderer.setClearColor(0x506f86);
    this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
    this.usePostprocessing = true;
    this.composer = new WAGNER.Composer(this.renderer);
    this.composer.setSize(width, height);
    this.initPostprocessing();

    this.sphere = new Sphere();
    this.plane = new Plane();
    this.buffer = new Buffer();
    this.sphere.position.set(0, -10, 0);
    // this.plane.position.set(0, -70, 0);
    this.plane.position.set(65, -249, -159);
    this.plane.rotation.set(1.5, 0.7, -0.3);
    this.scene.add(this.sphere);
    this.scene.add(this.plane);
    this.scene.add(this.light);

    // this.scene.add(this.buffer);

    const music = Math.floor(Math.random() * 2 + 1.5);

    // TODO CHANGE

    // TweenMax.to(this.camera.position, 2, {
    //   y: 0,
    //   delay: 0.5,
    //   ease: Power4.easeOut,
    // });
    //
    // TweenMax.to(this.camera.rotation, 2, {
    //   x: 0,
    //   delay: 0.5,
    // });
  }

  initPostprocessing() {
    // if (!this.usePostprocessing) return;

    this.useAsciiPass = false;

    this.vignette2Pass = new WAGNER.Vignette2Pass();
    this.asciiPass = new WAGNER.ASCIIPass();
    this.multiPassBloomPass = new WAGNER.MultiPassBloomPass();
    this.fxaaPass = new WAGNER.FXAAPass();

  }

  launchSound() {
    Sound.load(`/assets/mp3/02.mp3`);
  //
    Sound.on('start', () => {
      // FIXME REALLY, REALLY, REALLY UGLY
      // Sorry for you later when you will need to fix a shit ugly like this
      // presentation is tomorrow, I need to finish quickly to sleep
      window.isPlaying = true;

      // debugger;
    });
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

    const freq = {
      low: {
        length: 0,
        value: 0,
      },
      medium: {
        length: 0,
        value: 0,
      },
      high: {
        length: 0,
        value: 0,
      },
    };
    const time = {
      low: {
        length: 0,
        value: 0,
      },
      medium: {
        length: 0,
        value: 0,
      },
      high: {
        length: 0,
        value: 0,
      },
    };
    const freqArray = Sound.getData().freq;
    const freqLength = Sound.getData().freq.length;

    const timeArray = Sound.getData().time;
    const timeLength = Sound.getData().time.length;

    // if (timeArray[100] != 128) {
    //   console.log(freqArray);
    //   console.log(timeArray);
    //   debugger;
    // }
    for (let i = 0; i < freqLength; i++) {

      if (i < freqLength / 3) {
        freq.low.value += freqArray[i];
        time.low.value += timeArray[i];
        freq.low.length++;
        time.low.length++;
      } else if (i < (freqLength / 3) * 2) {
        freq.medium.value += freqArray[i];
        time.medium.value += timeArray[i];
        freq.medium.length++;
        time.medium.length++;
      } else {
        freq.high.value += freqArray[i];
        time.high.value += timeArray[i];
        freq.high.length++;
        time.high.length++;
      }

    }

    freq.low.value = (freq.low.value / freq.low.length) / 256;
    time.low.value = (time.low.value / time.low.length) / 256;

    freq.medium.value = (freq.medium.value / freq.medium.length) / 256;
    time.medium.value = (time.medium.value / time.medium.length) / 256;

    freq.high.value = (freq.high.value / freq.high.length) / 256;
    time.high.value = (time.high.value / time.high.length) / 256;

    // console.log('Audio', time, freq);

    // if (ts > 24000) debugger;

    this.sphere.update(ts, {freq, time});
    this.plane.update(ts);
    // this.buffer.update();
  }
}
