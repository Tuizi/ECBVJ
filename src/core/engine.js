export default class Engine {
    constructor(audio, registry, renderer) {
        this.audio = audio;
        this.registry = registry;
        this.renderer = renderer;
    }

    start() {
        Promise.all([
            this.audio.init(),
            this.registry.init(),
            this.renderer.init()
        ]).then(()=> {
            console.log('Engine ready...');
            this.audio.start();
            this.registry.start();
            this.renderer.start();

            this.loop = setInterval(this.loop.bind(this), 10);
        });
    }

    loop() {
        this.registry.process(this.audio.data);
    }
}