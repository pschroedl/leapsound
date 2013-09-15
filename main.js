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
  var leapControlled = {};
  leapControlled.Frequency = 200;
  leapControlled.LFORate = 10;
  leapControlled.LFOGain = 100;
  leapControlled.Resonance = 0;

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
        leapControlled.Frequency = frame.data.hands[0].palmPosition[1];
        leapControlled.LFORate = frame.data.hands[0].palmPosition[2];
        leapControlled.Resonance = frame.data.hands[0].palmPosition[0];
      }
    }

    //Assign changed gui.param and leap values to synth properties

    sampler.filterNode.frequency.value = leapControlled.Frequency*10;
    sampler.lfoNode.frequency.value = Math.abs(leapControlled.LFORate/10);
    sampler.filterNode.Q.value = leapControlled.Resonance/10;

    leapConsole(leapControlled);
  });  

});

