import domready from 'domready';
import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import Stats from 'stats-js';
import 'gsap';


let webgl;
let gui;
let stats;

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}

function animate(ts) {
  stats.begin();

  raf(animate);

  webgl.render(ts);

  stats.end();
}

function initGUI() {
  console.log('gui');
  // GUI settings
  window.gui = gui = new dat.GUI();

  const postProcess = gui.addFolder('Post Processing');
  postProcess.add(webgl, 'usePostprocessing');
  postProcess.add(webgl, 'useAsciiPass');
  postProcess.open();

  const plane = gui.addFolder('plane');

  const pPosition = plane.addFolder('position');
  pPosition.add(webgl.plane.position, 'x', -2000, 2000).step(1).listen().onChange(value => console.log(value));
  pPosition.add(webgl.plane.position, 'y', -2000, 2000).step(1).listen().onChange(value => console.log(value));
  pPosition.add(webgl.plane.position, 'z', -2000, 2000).step(1).listen().onChange(value => console.log(value));

  const pRotation = plane.addFolder('rotation');
  pRotation.add(webgl.plane.rotation, 'x', -3.5, 3.5).step(0.1).listen().onChange(value => console.log(value));
  pRotation.add(webgl.plane.rotation, 'y', -3.5, 3.5).step(0.1).listen().onChange(value => console.log(value));
  pRotation.add(webgl.plane.rotation, 'z', -3.5, 3.5).step(0.1).listen().onChange(value => console.log(value));

  plane.close();

  const camera = gui.addFolder('camera');

  const cPosition = camera.addFolder('position');
  cPosition.add(webgl.camera.position, 'x', -2000, 2000, 1).listen().onChange(value => console.log(value));
  cPosition.add(webgl.camera.position, 'y', -2000, 2000, 1).listen().onChange(value => console.log(value));
  cPosition.add(webgl.camera.position, 'z', -2000, 2000, 1).listen().onChange(value => console.log(value));

  const cRotation = camera.addFolder('rotation');
  cRotation.add(webgl.camera.rotation, 'x', -3.5, 3.5, 1).listen().onChange(value => console.log(value));
  cRotation.add(webgl.camera.rotation, 'y', -3.5, 3.5, 1).listen().onChange(value => console.log(value));
  cRotation.add(webgl.camera.rotation, 'z', -3.5, 3.5, 1).listen().onChange(value => console.log(value));

  // rotation.add(this.config, 'worldSpeed', -0.01, 0.01, 0.0001);
  // rotation.add(this.config, 'cloudSpeed', -0.01, 0.01, 0.0001);

}

function startExperiment() {
  // body...
  webgl.launchSound();
  document.getElementsByClassName('splashScreen')[0].classList.add('is-hidden');
}


domready(() => {

  setTimeout(()=> {
    document.getElementsByClassName('splashScreen')[0].classList.remove('is-hidden');
  }, 2000);

  // FIXME Go to Webgl.js and read
  window.isPlaying = false;


  const startButton = document.getElementById('start');
  startButton.addEventListener('click', (event)=> {
    startExperiment();
  });


  // webgl settings
  webgl = new Webgl(window.innerWidth, window.innerHeight);
  document.body.appendChild(webgl.renderer.domElement);

  initGUI();

  // handle resize
  window.onresize = resizeHandler;

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  // document.body.appendChild( stats.domElement );

  // let's play !
  animate();

});
