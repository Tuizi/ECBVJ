import Renderer from './renderer.js';

const SEPARATOR = 1;

export default class Monitor extends Renderer {
    constructor(canvasId, fftSize, config) {
        super(canvasId);

        this.fftSize = fftSize;
        this.bars = [];
        this.config = config;
    }

    init() {
        return new Promise((resolve) => {
            super.init().then(()=> {
                let barWidth = (this.size.width - (this.fftSize * SEPARATOR)) / this.fftSize,
                    canvasHeight = this.size.height;

                for (let i = 0; i < this.fftSize; i++) {
                    var left = i * barWidth + (i * SEPARATOR);

                    //create the background rect
                    let rectBackground = new fabric.Rect({
                        width: barWidth,
                        height: canvasHeight
                    });

                    //create the bar
                    let rect = new fabric.Rect({
                        originY: "bottom",
                        top: canvasHeight,
                        width: barWidth,
                        height: 10 + i,
                        fill: '#57575E'
                    });

                    this.bars.push(rect);

                    //create the text
                    let text = new fabric.Text((i + 1).toString(), {
                        top: canvasHeight,
                        originY: 'bottom',
                        fill: '#D4D4D4',
                        fontSize: 12
                    });

                    //create the group bar
                    let barGroup = new fabric.Group([rectBackground, rect, text], {
                        left: left,
                        hasControls: false,
                        hasBorders: false,
                        hasRotatingPoint: false,
                        lockMovementX: true,
                        lockMovementY: true,
                        data: {
                            freq: i
                        }
                    });

                    let context = this;
                    barGroup.on('selected', function () {
                        context.onBarSelected(this.data.freq);
                    });

                    this.canvas.add(barGroup);
                }

                resolve();
            });
        });
    }

    process(data) {
        _.each(this.bars, (bar, index) => {
            bar.setHeight(this.getHeightFromFreq(data[index]));
        });

        this.canvas.renderAll();
    }

    onBarSelected(freqSelected) {
        if (this.selectedBar) {
            this.selectedBar.setColor('#57575E');
        }

        this.selectedBar = this.bars[freqSelected];
        this.selectedBar.setColor('#D4D4D4');

        this.config.onFreqSelected(freqSelected);
    }
}