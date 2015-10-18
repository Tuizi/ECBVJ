import * as _ from '../../libs/lodash/lodash.min';
import Shape from '../../core/shape';

export default class Monitor {
    fGroup;
    bars;

    constructor(fftSize, canvasWidth) {
        this.bars = [];
        let barWidth = canvasWidth / fftSize;

        console.debug('barWidth', barWidth);

        for (let i = 0; i < fftSize; i++) {
            this.bars.push(new fabric.Rect({
                width: barWidth,
                height: 0,
                left: i * 10 + 1,
                fill: 'tomato'
            }));
        }

        this.fGroup = new fabric.Group(this.bars);
    }

    get group() {
        return this.fGroup;
    }

    process(data) {
        _.each(this.bars, (bar, index) => {
            bar.set('height', data[index]);
        });
        console.log('monitor process data :)');
    }
}