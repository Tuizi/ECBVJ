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
                    barGroups = [];

                for (let i = 0; i < this.fftSize; i++) {
                    //create the bar
                    var left = i * barWidth + i;

                    let rect = new fabric.Rect({
                        width: barWidth,
                        height: 10 + i,
                        left: left,
                        fill: 'tomato',
                        originY: "bottom"
                    });

                    this.bars.push(rect);

                    //create the text
                    let text = new fabric.Text((i + 1).toString(), {
                        fill: 'white',
                        left: left,
                        fontSize: 12
                    });

                    //create the group
                    var barGroup = new fabric.Group([rect, text]);

                    barGroup.on('mouse:up', ()=> {
                        console.debug(':)')
                    });

                    barGroup.on('object:selected', ()=> {
                        console.debug(':)')
                    });

                    barGroups.push(barGroup);
                }

                let renderGroup = new fabric.Group(barGroups, {
                    top: this.size.height,
                    originY: 'bottom',
                    selectable: false
                });

                renderGroup.on('mouse:up', ()=> {
                    console.debug('renderGroup :)')
                });
                renderGroup.on('object:selected', ()=> {
                    console.debug('renderGroup :)')
                });

                this.canvas.add(renderGroup);

                resolve();
            });
        });

    }
}