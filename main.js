$(document).ready(function(){

  var audioContext = initAudioContext();  //throws error if Web Audio API or webkitAudio API is not avail.
  
  var soundSource = audioContext.createBufferSource();

  var sampler =  new SimpleSampler(soundSource, audioContext);

/* Load sample file over http to our buffer */
  
  var getSample = new XMLHttpRequest(); 
  getSample.open("GET","synthstabbing.wav",true);
  getSample.responseType = "arraybuffer";
  getSample.onload = function(){
    var soundBuffer = audioContext.createBuffer(getSample.response,false) //flag is set for stereo
    soundSource.buffer = soundBuffer;
    soundSource.loop = true;
    soundSource.start(0);
  };  
  getSample.send();

/* View Param Init, View GUI. Init */
  addGui(sampler,soundSource);

/* Default var setting, control assignments */

  //deal defaults
  var leapControlledFrequency = 200;
  var leapControlledLFORate = 10;
  var leapControlledLFOGain = 100;
  var leapControlledResonance = 0;

/* Main program loop */

  //polls (60xsecond)
  //the Leap.loop frame for
  //xyz of hand position ( only open - 1 or more fingers )
  //and controls 3 params from synth
  //LPF Freq, Q, and LFO Rate

  Leap.loop(function(frame) {
    if (frame.hands.length < 1){
      //outputGain.gain.value = 0;
      return;
    }

    if (frame.hands.length >= 1){
      if (frame.hands[0].fingers.length >= 2){
        //outputGain.gain.value = 10;
        leapControlledFrequency = frame.data.hands[0].palmPosition[1];
        leapControlledLFORate = frame.data.hands[0].palmPosition[2];
        leapControlledResonance = frame.data.hands[0].palmPosition[0];
      }
    }

    //Assign changed gui.param and leap values to synth properties

    sampler.filterNode.frequency.value = leapControlledFrequency*10;
    sampler.lfoNode.frequency.value = Math.abs(leapControlledLFORate/10);
    sampler.filterNode.Q.value = leapControlledResonance/10;
    
    //Debugging
    console.clear();
    console.log("Filter Frequency : " 
      + sampler.filterNode.frequency.value);
    console.log("Filter Resonance : " 
      + sampler.filterNode.Q.value);
    console.log("LFO Rate : " 
      + sampler.lfoNode.frequency.value);

    console.log("(x,y,z) : "
      + leapControlledResonance 
      + " " 
      + leapControlledFrequency 
      + " " 
      + leapControlledLFORate);
    console.log("testing!2");
  });  

});

