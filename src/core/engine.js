import Audio from './audio.js';
import Registry from './registry.js';
import Renderer from './renderer.js';
import Trigger from './trigger';

import Monitor from './monitor.js';

export default class Engine {
    constructor(canvasName) {
        this.audio = new Audio();
        this.registry = new Registry();
        this.renderer = new Renderer(canvasName);
    }

    start() {
        Promise.all([
            this.audio.init(),
            this.registry.init(),
            this.renderer.init()
        ]).then(()=> {
            console.log('Engine ready...');
            this.audio.start();
            this.registry.start();
            this.renderer.start();

            this.add(new Trigger('all', new Monitor(this.audio, this.renderer)));

            this.loop = setInterval(this.loop.bind(this), 10);
        });
    }

    loop() {
        this.registry.process(this.audio.data);
    }

    add(trigger) {
        this.renderer.add(trigger.shape);
        this.registry.add(trigger)
    }
}