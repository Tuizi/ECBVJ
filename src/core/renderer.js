export default class Renderer {
    constructor(canvasId) {
        this.canvasId = canvasId;

        this.parentElement = document.querySelector('#' + this.canvasId).parentElement;
    }

    get size() {
        return {width: this.parentElement.clientWidth, height: this.parentElement.clientHeight};
    }

    init() {
        return new Promise((resolve, reject)=> {
            try {

                this.canvas = new fabric.Canvas(this.canvasId, {
                    width: this.size.width,
                    height: this.size.height
                });

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    start() {
        console.warn(this.canvasId, 'start not yet implemented.');
    }

    process() {
        console.warn(this.canvasId, 'start not yet implemented.');
    }
}