export default class Renderer {
    constructor(canvas) {
        this.canvasName = canvas;
    }

    init() {
        return new Promise((resolve, reject)=> {
            this.canvas = new fabric.Canvas(this.canvasName);

            console.log("Renderer ready...");

            resolve();
        });
    }

    start() {
        this.render();
    }

    render() {
        this.canvas.renderAll();

        this.animationFrame = window.requestAnimationFrame(this.render.bind(this));
    }
}