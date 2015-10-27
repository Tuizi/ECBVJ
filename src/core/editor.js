import Renderer from './renderer.js';

export default class Editor extends Renderer {

    freqSelected = null;

    init() {
        return new Promise((resolve) => {
            super.init().then(()=> {
                let canvasHeight = this.size.height;

                //create the bar
                let rect = new fabric.Rect({
                    originY: "bottom",
                    top: canvasHeight,
                    width: 10,
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

    selectFreq(freq) {
        this.freqSelected = freq;
    }
}