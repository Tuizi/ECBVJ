import Audio from './components/audio/audio.js';
import Renderer  from './components/renderer/renderer.js';

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

let audio = new Audio();
let renderer = new Renderer("monitor");

audio.init().then(() => {
    renderer.init();
    loop();
});

var loop = () => {
    console.log('loop');
    renderer.test(audio.data[2]);
    renderer.render();
    window.requestAnimationFrame(loop);
};
