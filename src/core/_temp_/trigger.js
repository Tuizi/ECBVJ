export default class Trigger {
    _value;
    _shape;

    constructor(freq, shape) {
        this._value = freq;
        this._shape = shape;
    }

    process(data) {
        if(this._value === 'all') {
            this._shape.process(data);
        }
    }

    get shape() {
        return this._shape;
    }

    get value() {
        return this._value;
    }
}