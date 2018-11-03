//declare varibles
var song;
var fft;
var button;
var w;

//on button click play/pause audio
function toggleSong() {
    if (song.isPlaying()) {
        //pause audio and change button text to Play
        song.pause();
        button.html('Play');
    } else {
        //pause audio and change button text to Pause
        song.play();
        button.html('Pause');
    }
}

//Call loadSound() during preload() to ensure that the sound is completely loaded before setup() is called
function preload() {
    //change song file name here
    song = loadSound('song.mpeg');
}

function setup() {
    //create canvas with width 600*600
    createCanvas(600, 600);
    //angles will be in DEGREES metrix
    angleMode(DEGREES);
    //color mode will be HSB
    colorMode(HSB);
    //create the button
    button = createButton('Pause');
    //attach event listner on button click/press
    button.mousePressed(toggleSong);
    //default play song when sketch canvas is loaded
    song.play();
    /*
    FFT (Fast Fourier Transform) is an analysis algorithm that isolates 
    individual audio frequencies within a waveform.
    */
    //0.9 Smooth results of Freq Spectrum range between (0-1)
    //64 Length of resulting array. Must be a power of two between 16 and 1024. Defaults to 1024.
    fft = new p5.FFT(0.9, 64);
    //As we have 64 sample to show them in full width of canvas
    w = width / 64;
}

function draw() {
    //set canvas background to black
    background(0);
    //Returns an array of amplitude values (between 0 and 255) across the frequency spectrum.
    var spectrum = fft.analyze();
    //No stroke on canvas 
    noStroke();
    for (var i = 0; i < spectrum.length; i++) {
        var amp = spectrum[i];
        //map canvas height 0-600 to 0-255 (amplitude values)
        var y = map(amp, 0, 256, height, 0);
        //n number of block in one amplitude bar
        var n = (height - y) / 5;
        //create rectangle block
        for (var j = 0; j <= n; j++) {
            //Fill the color white in middle and blue at the ends
            fill(255, Math.abs(n / 2 - j) * 2, 255);
            //Draw rectangles rect(x, y, width, height)
            rect(i * w, y / 2 + j * 5, w - 3, 4);
        }
    }
}