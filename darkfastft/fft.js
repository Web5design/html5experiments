var FFT = FFT || {};

FFT.context = new webkitAudioContext();
FFT.source = FFT.context.createBufferSource();
FFT.analyser = FFT.context.createAnalyser();

FFT.analyser.fftSize = 2048;
FFT.analyser.smoothingTimeConstant = 0.85; // avg
FFT.freqByteData = new Uint8Array(FFT.analyser.frequencyBinCount);

FFT.band = 0;

FFT.initialize = function(song) {
    FFT.source.connect(FFT.analyser);
    FFT.analyser.connect(FFT.context.destination);
}
