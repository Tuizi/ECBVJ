import Audio from './audio.js';

import Monitor from './monitor.js';
import Freq from './freq.js';
import Editor from './editor.js';
import Visual from './visual.js';

export default class Engine {
    constructor(canvas) {
        this.audio = new Audio();

        this.monitor = new Monitor(canvas.monitor, this.audio.fftSize, {
            onFreqSelected: this.onFreqSelected.bind(this)
        });
        this.freq = new Freq(canvas.freq);
        //this.editor = new Editor(canvas.editor);
        //this.editor = new Editor(canvas.editor);
        //this.visual = new Visual(canvas.visual);
    }

    start() {
        Promise.all([
            this.audio.init(),
            this.monitor.init(),
            this.freq.init()
            //this.editor.init()
        ]).then(
            ()=> {
                console.log('Engine ready...');
                this.audio.start();

                this.loop();
            },
            (err) => {
                console.error(err);
            });
    }

    loop() {
        var data = this.audio.data;

        this.monitor.process(data);
        this.freq.process(data);
        //this.editor.process(data);

        window.requestAnimationFrame(this.loop.bind(this));
    }

    onFreqSelected(freq) {
        this.freq.select(freq);
    }
}