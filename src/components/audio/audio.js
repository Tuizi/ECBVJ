export default class Audio {
    constructor() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

        if (!navigator.getUserMedia) {
            throw new Error("getUserMedia not supported on your browser!")
        }
    }

    init() {
        let audioCtx = new window.AudioContext();

        this.analyser = audioCtx.createAnalyser();
        this.analyser.fftSize = 256;

        return new Promise((resolve, reject) => {
            navigator.getUserMedia({audio: true},
                // Success callback
                (stream) => {
                    let source = audioCtx.createMediaStreamSource(stream);

                    source.connect(this.analyser);

                    resolve();
                },
                (err) => {
                    reject('The following gUM error occured: ' + err.name + ' ' + err.message);
                }
            );
        });
    }

    set fftSize(size) {
        this.analyser.fftSize = size;
    }

    get data() {
        let bufferLength = this.analyser.fftSize,
            dataArray = new Uint8Array(bufferLength);

        this.analyser.getByteFrequencyData(dataArray);

        return dataArray;
    }
}