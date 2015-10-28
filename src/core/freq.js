import Renderer from './renderer.js';

export default class Freq extends Renderer {
    init() {
        this.freqSelected = null;
        return new Promise((resolve) => {
            super.init().then(()=> {
                let canvasSize = this.size;

                //create the bar
                let rect = new fabric.Rect({
                    originY: "bottom",
                    top: canvasSize.height,
                    width: canvasSize.width,
                    height: 0,
                    fill: 'tomato'
                });

                this.bar = rect;

                this.canvas.add(rect);

                resolve();
            });
        });
    }

    process(data) {
        if(this.freqSelected === null) {
            return;
        }

        var freqData = data[this.freqSelected];

        this.bar.setHeight(this.getHeightFromFreq(freqData));

        this.canvas.renderAll();
    }

    select(freq) {
        this.freqSelected = freq;
    }
}