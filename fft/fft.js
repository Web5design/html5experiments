var FFT = FFT || {};

FFT.context = new webkitAudioContext();
FFT.source = FFT.context.createBufferSource();
FFT.analyser = FFT.context.createAnalyser();

FFT.analyser.fftSize = 2048;
FFT.analyser.smoothingTimeConstant = 0.0; // no avg
FFT.freqByteData = new Uint8Array(FFT.analyser.frequencyBinCount);

FFT.band = 1;

FFT.initialize = function() {
    FFT.source.connect(FFT.analyser);
    FFT.analyser.connect(FFT.context.destination);
    FFT.loadSong();
}

FFT.loadSong = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "armin.mp3", true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        FFT.source.buffer = FFT.context.createBuffer(xhr.response, false);
        FFT.source.loop = true;
        FFT.source.noteOn(0);
        // any key stops
        document.addEventListener('keydown', function() {
            FFT.source.noteOff(0);
        });
        window.webkitRequestAnimationFrame(MAIN.doFFT);
    };
    xhr.send();
}
