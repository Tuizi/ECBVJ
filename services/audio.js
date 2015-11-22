angular
	.module('audio', [])
	.service('Audio', () => {
		'use strict'

		let context = this;
        this.audioCtx = new window.AudioContext();

        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 64;

		return {
			init: () => {
				return new Promise((resolve, reject) => {
					if (!navigator.getUserMedia || !window.AudioContext) {
						reject("WebAudio API not supported on your browser!");
						return;
					}

					navigator.getUserMedia({ audio: true },
						(stream) => {
							let source = this.audioCtx.createMediaStreamSource(stream);

							source.connect(this.analyser);

							console.log('Audio ready...');
							resolve();
						},
						(err) => {
							reject('The following gUM error occured: ' + err.name + ' ' + err.message);
						});
				});
			},

			set fftSize(size) {
				context.analyser.fftSize = size;
			},
			get fftSize() {
				return context.analyser.fftSize;
			},
			get data() {
				let bufferLength = context.analyser.fftSize,
					dataArray = new Uint8Array(bufferLength);

				context.analyser.getByteFrequencyData(dataArray);

				return dataArray;
			}
		}
	})