import Audio from './core/audio.js';
import Registry from './core/registry.js';
import Trigger from './core/trigger';
import Renderer from './core/renderer.js';
import Engine from './core/engine.js';

import Monitor from './components/monitor/monitor';

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

//TODO engine should do those news
let audio = new Audio();
let registry = new Registry();
let renderer = new Renderer('board');

let engine = new Engine(audio, registry, renderer);

engine.start();

let monitor = new Monitor(audio.fftSize, window.innerWidth),
    monitorTrigger = new Trigger('all', monitor);

//TODO engine.add(monitor)
renderer.add(monitor);
registry.add(monitorTrigger);