import Audio from './audio.js';

import Monitor from './monitor.js';
import Editor from './editor.js';
import Visual from './visual.js';

export default class Engine {
    constructor(canvas) {
        this.audio = new Audio();

        this.monitor = new Monitor(canvas.monitor, this.audio.fftSize);
        //this.editor = new Editor(canvas.editor);
        //this.visual = new Visual(canvas.visual);
    }

    start() {
        Promise.all([
            this.audio.init(),
            this.monitor.init()
        ]).then(
            ()=> {
                console.log('Engine ready...');
                this.audio.start();

                this.loop();
                //this.loopId = setInterval(this.loop.bind(this), 10);
            },
            (err) => {
                console.error(err);
            });
    }

    loop() {
        this.monitor.process(this.audio.data);

        window.requestAnimationFrame(this.loop.bind(this));
    }
    //
    //add(trigger) {
    //    this.renderer.add(trigger.shape);
    //    this.registry.add(trigger)
    //}
}