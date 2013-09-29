leapSound
=========
Inspired by the Z-Plane filters in hardware samplers made by Emu Systems, 
leapSound is an implementation of four parallel filters controlled by the Leap Motion Controller, or the on-screen knobs. It utilizes the ( webkit ) Web Audio API, and the Leap Motion Javascript API, and as such, will only
run in Google Chrome.

The filterbank can be controlled in the 'Z-Plane' manner ( morphing multiple filters in
different axes simultaneously) by utilizing the Leap Motion hardware
controller.

The Y axis is set to control the filter cutoff frequency, and X and Z control
resonance and gain, respectively.

You can play with the demo here :  http://doesntexistyet-elasticbeanstalk.com

This was also only partly the case with the Leap.js API  ( which has pretty
good docs and some great examples ).  The difficulties I encountered using the
Leap were mostly in the areas of interpreting and scaling the data from the
Leap Motion Controller, as well as figuring out ways of using the data so that
the user can interact in an intuitive way.  Also, any errors inside the leap main loop silently fail, making debugging a bit of a chore.

Uses jqueryui-knob( https://github.com/aterrien/jQuery-Knob ) and dat.gui for the user interface
( https://code.google.com/p/dat-gui/ ).
