export default class Renderer {

    constructor(canvasId) {

        this.canvas = new fabric.Canvas(canvasId);
    }

    init() {
        // create a rectangle object
        this.rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20
        });

        // "add" rectangle onto canvas
        this.canvas.add(this.rect);

        this.render();
    }

    test(value) {
        this.rect.set({height: value, width: value});
    }

    render() {
        this.canvas.renderAll();
    };
}