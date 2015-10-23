import Renderer from './renderer.js';

export default class Monitor extends Renderer {
    constructor(canvasId, fftSize) {
        super(canvasId);

        this.fftSize = fftSize;
        this.bars = [];
    }

    init() {
        return new Promise((resolve) => {
            super.init().then(()=> {
                let barWidth = (this.size.width - this.fftSize) / this.fftSize,
                    canvasHeight = this.size.height;

                for (let i = 0; i < this.fftSize; i++) {
                    var left = i * barWidth + i;

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
                        fill: 'tomato'
                    });

                    this.bars.push(rect);

                    //create the text
                    let text = new fabric.Text((i + 1).toString(), {
                        top: canvasHeight,
                        originY: 'bottom',
                        fill: 'white',
                        fontSize: 12
                    });

                    //create the group bar
                    let barGroup = new fabric.Group([rectBackground, rect, text], {
                        left: left,
                        hasControls: false,
                        hasRotatingPoint: false,
                        lockMovementX: true,
                        lockMovementY: true
                    });

                    barGroup.on('selected', ()=> {
                        debugger;
                        console.log('select');
                    });

                    this.canvas.add(barGroup);
                }

                resolve();
            });
        });

    }
}