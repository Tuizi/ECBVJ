class Audio {
    constructor() {
        navigator.getUserMedia = (
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia
        );

        if (!navigator.getUserMedia) {
            throw new Error("getUserMedia not supported on your browser!")
        }
    }

    init() {
        return new Promise((resolve, reject) => {
            navigator.getUserMedia ({audio: true},
                // Success callback
                (stream) => {
                    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    this.analyser = audioCtx.createAnalyser();
                    this.analyser.fftSize = 256;
                    let distortion = audioCtx.createWaveShaper();

                    let source = audioCtx.createMediaStreamSource(stream);

                    source.connect(this.analyser);
                    this.analyser.connect(distortion);
                    resolve();
                },
                (err) => {
                    reject('The following gUM error occured: ' + err);
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

        this.analyser.getByteTimeDomainData(dataArray);

        return dataArray;
    }
}

export function init() {
    var audio = new Audio();

    audio.init().then(() => {
        setInterval(() => {
            console.log(audio.data);
        }, 500);

    });
}