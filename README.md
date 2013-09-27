leapSound
=========
Inspired by the Z-Plane filters in hardware samplers made by Emu Systems, 
leapSound is an implementation of four parallel filters controlled by the Leap Motion Controller, or the on-screen knobs. It utilizes the Web Audio API, and Leap Motion Javascript API, and as such, will only
run in Google Chrome ( tested on v29.0.1547.76 ).

The filterbank can be controlled in the 'Z-Plane' manner ( morphing multiple filters in
different axes simultaneously) by utilizing the Leap Motion hardware
controller.

The Y axis is set to control the filter cutoff frequency, and X and Z control
resonance and gain, respectively.

The filters employed are all Web Audio API native biQuadFilterNodes.

You can play with the demo here :  http://doesntexistyet-elasticbeanstalk.com

The Web Audio API spec hasn't been around too long, and this contributed to some serious
challenges.  Particularly, the lack of documentation and examples that reflect the
state of the current interface - as well as the existance outdated documentation and examples.

This was also only partly the case with the Leap.js API  ( which has pretty
good docs and some great examples ).  The difficulties I encountered using the
Leap were mostly in the areas of interpreting and scaling the data from the
Leap Motion Controller, as well as figuring out ways of using the data so that
the user can interact in an intuitive way.  Also, any errors inside the leap main loop silently fail, making debugging a bit of a chore.

Uses jqueryui-knob( https://github.com/aterrien/jQuery-Knob ) and dat.gui for the user interface
( https://code.google.com/p/dat-gui/ ).
