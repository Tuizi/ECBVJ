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
            },
            (err) => {
                console.error(err);
            });
    }

    //loop() {
    //    this.registry.process(this.audio.data);
    //}
    //
    //add(trigger) {
    //    this.renderer.add(trigger.shape);
    //    this.registry.add(trigger)
    //}
}