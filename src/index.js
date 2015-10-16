import Audio from './core/audio.js';
import Registry from './core/_registry.js';
import Renderer from './core/renderer.js';
import Engine from './core/engine.js';

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

let audio = new Audio();
let registry = new Registry();
let renderer = new Renderer('board');

let engine = new Engine(audio, registry, renderer);

engine.start();

//audio.init().then(() => {
//    renderer.init();
//    loop();
//});
//
//var loop = () => {
//    console.log('loop');
//    renderer.test(audio.data[2]);
//    renderer.render();
//    window.requestAnimationFrame(loop);
//};
