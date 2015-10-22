export default class Audio {
    constructor() {
        this.audioCtx = new window.AudioContext();

        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 64;
    }

    init() {
        return new Promise((resolve, reject) => {
            if (!navigator.getUserMedia || !window.AudioContext) {
                reject("WebAudio API not supported on your browser!");
                return;
            }

            navigator.getUserMedia({audio: true},
                // Success callback
                (stream) => {
                    let source = this.audioCtx.createMediaStreamSource(stream);

                    source.connect(this.analyser);

                    console.log('Audio ready...');
                    resolve();
                },
                (err) => {
                    reject('The following gUM error occured: ' + err.name + ' ' + err.message);
                }
            );
        });
    }

    start() {

    }

    set fftSize(size) {
        this.analyser.fftSize = size;
    }

    get fftSize() {
        return this.analyser.fftSize;
    }

    get data() {
        let bufferLength = this.analyser.fftSize,
            dataArray = new Uint8Array(bufferLength);

        this.analyser.getByteFrequencyData(dataArray);

        return dataArray;
    }
}