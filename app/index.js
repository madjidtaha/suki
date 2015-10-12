import domready from 'domready';
import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';


let webgl;
let gui;

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
  raf(animate);

  webgl.render();
}

function initGUI() {
  // GUI settings
  window.gui = gui = new dat.GUI();

  const postProcess = gui.addFolder('Post Processing');
  postProcess.add(webgl, 'usePostprocessing');
  postProcess.add(webgl, 'useAsciiPass');
  postProcess.open();

  const controls = gui.addFolder('controls');

  // controls.add(this.config, 'minDistance', 100, 300, 1)
  // .onChange(function onChange(newValue) {
  //   this.controls.minDistance = newValue;
  // }.bind(this));
  //
  // controls.add(this.config, 'maxDistance', 300, 600, 1)
  // .onChange(function onChange(newValue) {
  //   this.controls.maxDistance = newValue;
  // }.bind(this));

  controls.open();

  const rotation = gui.addFolder('rotation');
  // rotation.add(this.config, 'worldSpeed', -0.01, 0.01, 0.0001);
  // rotation.add(this.config, 'cloudSpeed', -0.01, 0.01, 0.0001);

}

domready(() => {
  // webgl settings
  webgl = new Webgl(window.innerWidth, window.innerHeight);
  document.body.appendChild(webgl.renderer.domElement);

  initGUI();

  // handle resize
  window.onresize = resizeHandler;

  // let's play !
  animate();
});
