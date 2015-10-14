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

function animate(ts) {
  raf(animate);

  webgl.render(ts);
}

function initGUI() {
  // GUI settings
  window.gui = gui = new dat.GUI();

  const postProcess = gui.addFolder('Post Processing');
  postProcess.add(webgl, 'usePostprocessing');
  postProcess.add(webgl, 'useAsciiPass');
  postProcess.open();

  const plane = gui.addFolder('plane');

  const pPosition = plane.addFolder('position');
  pPosition.add(webgl.plane.position, 'x', -2000, 2000, 1).listen();
  pPosition.add(webgl.plane.position, 'y', -2000, 2000, 1).listen();
  pPosition.add(webgl.plane.position, 'z', -2000, 2000, 1).listen();

  const pRotation = plane.addFolder('rotation');
  pRotation.add(webgl.plane.rotation, 'x', -3.5, 3.5, 0.1)
  .listen()
  .onChange(function onChange(value) {
    console.log('Value x', value);
  });
  pRotation.add(webgl.plane.rotation, 'y', -3.5, 3.5, 0.1).listen();
  pRotation.add(webgl.plane.rotation, 'z', -3.5, 3.5, 0.1).listen();

  plane.close();

  const camera = gui.addFolder('camera');

  const cPosition = camera.addFolder('position');
  cPosition.add(webgl.camera.position, 'x', -2000, 2000, 1).listen();
  cPosition.add(webgl.camera.position, 'y', -2000, 2000, 1).listen();
  cPosition.add(webgl.camera.position, 'z', -2000, 2000, 1).listen();

  const cRotation = camera.addFolder('rotation');
  cRotation.add(webgl.camera.rotation, 'x', -3.5, 3.5, 1).listen();
  cRotation.add(webgl.camera.rotation, 'y', -3.5, 3.5, 1).listen();
  cRotation.add(webgl.camera.rotation, 'z', -3.5, 3.5, 1).listen();

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
