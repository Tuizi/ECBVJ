export default class Trigger {
    freq;
    shape;

    constructor(freq, shape) {
        this.freq = freq;
        this.shape = shape;
    }

    process(data) {
        if(this.freq === 'all') {
            this.shape.process(data);
        }
    }
}