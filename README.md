#leapSound
>Creatively filter audio signals by waving your hands in the air
=========
Inspired by the Z-Plane filters in hardware samplers made by <a href="http://en.wikipedia.org/wiki/E-mu_Systems">E-mu Systems</a>, 
leapSound is an implementation of four parallel filters controlled by the Leap Motion Controller, or the on-screen knobs. It utilizes the ( webkit ) Web Audio API, and the Leap Motion Javascript API, and as such, will only
run in Google Chrome.

##How do I use it?

If you're going to run this locally, you need to fire up a webserver - I like to just run "python -m SimpleHTTPServer" from within the leapsound folder.

You could just play with the on-screen knobs, but the real magic happens when you plug in a Leap Motion Controller ( and install the requisite software ).

The filterbank is controlled in a 'Z-Plane'-like manner ( morphing multiple filters simultaneously)

The Y axis ( up and down ) is set to control the filter cutoff frequency, and X and Z ( side/side , front/back ) control resonance and gain, respectively.

Filters 1 and 2 can be controlled by extending one finger, 3 and 4 respond to movements while 2 fingers are extended, opening all fingers will control all filters, and motions while making a fist are ignored ( watch out for the thumb - Leap will detect it as a finger if you're not careful ).

##What kind of filters are these?

I was hoping you'd ask.  The filters are 24db/octave or 4-pole ( made by setting up two biQuadFilters in series ), in memory of Robert Moog and his amazing synths.

##Warning
I recommend turning down the volume and NOT using headphones, as higher resonances get pretty loud pretty quickly.


