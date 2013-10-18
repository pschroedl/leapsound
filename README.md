#leapSound
>Creatively filter audio signals by waving your hands in the air
Inspired by the Z-Plane filters in hardware samplers made by <a href="http://en.wikipedia.org/wiki/E-mu_Systems">E-mu Systems</a>, 
leapSound is an implementation of three parallel filters controlled by the Leap Motion Controller, or the on-screen knobs. 

<a href="http://gator3082.hostgator.com/~schroedl/leapfilters/">Play with the demo</a>

##How do I use it?

You could just play with the on-screen knobs, but the real magic happens when you plug in a Leap Motion Controller.

The filterbank is controlled in a 'Z-Plane'-like manner ( morphing multiple filters simultaneously)

The Y axis ( up and down ) controls the filter cutoff frequency, and X and Z ( side/side , front/back ) control resonance and gain, respectively.

Filters are selected by how many fingers you're holding out. 1 for the top filter, 2 for the middle, and 3 for the bottom one.  An open palm will control all filters, and motions while making a fist are ignored ( watch out for the thumb - Leap will detect it as a finger if you're not careful ).

##What kind of filters are these?

I was hoping you'd ask.  The filters are 24db/octave or 4-pole ( made by setting up two biQuadFilters in series ), in memory of Robert Moog and his amazing synths.

It utilizes the Web Audio API, the Leap Motion Javascript API, and jQuery.  It is only tested in Google Chrome.

##WARNING
I recommend turning down the volume and NOT using headphones, as higher resonances get pretty loud pretty quickly.

