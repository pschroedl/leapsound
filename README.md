leapSound
=========
Inspired by the Z-Plane filters in hardware samplers made by Emu Systems, 
leapSound is an implementation of four parallel filters controlled by the Leap Motion Controller, or the on-screen knobs. It utilizes the ( webkit ) Web Audio API, and the Leap Motion Javascript API, and as such, will only
run in Google Chrome.

The filterbank can be controlled in a 'Z-Plane'-like manner ( morphing multiple filters simultaneously) by utilizing the Leap Motion hardware
controller.  The Y axis ( up and down ) is set to control the filter cutoff frequency, and X and Z ( side/side , front/back ) control resonance and gain, respectively. Filters 1 and 2 can be controlled by extending one finger, 3 and 4 respond to movements while 2 fingers are extended, opening all fingers will control all filters, and motions while making a fist are ignored ( watch out for the thumb! )

The filters are 24db/octave or 4-pole ( made by setting up two biQuadFilters in series ), in memory of Robert Moog and his amazing filters.

You can play with the demo here :  http://gator3082.hostgator.com/~schroedl/leapfilters/

leapSound uses jqueryui-knob( https://github.com/aterrien/jQuery-Knob ) and dat.gui for the user interface
( https://code.google.com/p/dat-gui/ ), and jasmine for testing.
