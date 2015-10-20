import * as _ from '../libs/lodash/lodash.min';

export default class Monitor {
    fGroup;
    bars;

    constructor(audio, renderer) {
        var fftSize = audio.fftSize,
            canvasSize = renderer.size;

        this.bars = [];
        let barWidth = canvasSize.width / fftSize,
            texts = [];

        for (let i = 0; i < fftSize; i++) {

            var left = i * barWidth + i;

            let rect = new fabric.Rect({
                width: barWidth,
                height: 0,
                left: left,
                fill: 'tomato',
                originY: "bottom"
            });

            rect.on('selected', () => {
                console.debug('selected');
            });

            this.bars.push(rect);

            texts.push(new fabric.Text((i + 1).toString(), {
                fill: 'white',
                left: left + 6,
                fontSize: 12
            }));
        }

        var items = _.chain([])
            .concat(this.bars)
            .concat(texts)
            .value();

        this.fGroup = new fabric.Group(items, {
            top: canvasSize.height,
            originY: 'bottom',
            selectable: false
        });
    }

    get group() {
        return this.fGroup;
    }

    process(data) {
        _.each(this.bars, (bar, index) => {
            bar.set('height', data[index]);
        });
    }
}