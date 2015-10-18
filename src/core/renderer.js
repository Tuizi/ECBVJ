export default class Renderer {
    constructor(canvas) {
        this.canvasName = canvas;
    }

    init() {
        return new Promise((resolve)=> {
            this.canvas = new fabric.Canvas(this.canvasName,
                {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    backgroundColor: "#000"
                });

            console.log("Renderer ready...");

            resolve();
        });
    }

    get width() {
        return this.canvas.get('width');
    }

    start() {
        this.render();
    }

    render() {
        this.canvas.renderAll();

        this.loop = window.requestAnimationFrame(this.render.bind(this));
    }

    add(shape) {
        this.canvas.add(shape.group);
    }
}