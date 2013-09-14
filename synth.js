$(document).ready(function(){
  //init web audio
  var audioContext;

  //initialize sound source/buffer - first node in sound chain ( TODO - make soundchain into array )
  var soundSource = audioContext.createBufferSource();


  // Not all all browsers support AudioContext - use webKit prefix for safari
  if (typeof AudioContext !== "undefined") {
      audioContext = new AudioContext();
  } else if (typeof webkitAudioContext !== "undefined") {
      audioContext = new webkitAudioContext();
  } else {
      throw new Error('AudioContext not supported - try Google Chrome Canary');
  }

  //load sample file over http to our buffer
  var sampleReq = new XMLHttpRequest(); 
  sampleReq.open("GET","hoover.wav",true);
  sampleReq.responseType = "arraybuffer";
  sampleReq.onload = function(){
    var soundBuffer = audioContext.createBuffer(sampleReq.response,false) //flag is set for stereo
    soundSource.buffer = soundBuffer;
    soundSource.loop = true;
    soundSource.start(0);
  };

  //create/connect lowpass filter
  var filterNode = audioContext.createBiquadFilter();
  filterNode.type = 0;
  filterNode.frequency.value = 1000;

  //create Low frequency oscillator
  var lfoNode = audioContext.createOscillator();
  var lfoGain = audioContext.createGainNode();
  lfoNode.type = "sine";
  lfoNode.frequency.value = 10;
  lfoGain.gain.value = 2000;
  lfoNode.connect(lfoGain);
  lfoGain.connect(filterNode.frequency);

  //attach filter into the chain
  soundSource.connect(filterNode);
  filterNode.connect(outputGain);

  //create final output gain node
  var outputGain = audioContext.createGainNode();
  outputGain.gain.value = 10;

  //final gain to output
  outputGain.connect(audioContext.destination);

  //dat.gui provides sliders for parameters
  var gui = new dat.GUI();
  this.freq = filterNode.frequency.value;
  this.Q = filterNode.Q.value;
  this.loopEnd = soundSource.loopEnd;
  this.LFORate = lfoNode.frequency.value;
  this.LFOGain = lfoGain.gain.value;

  this.frequencyScaling = 0;
  this.LFORateScaling = 10;
  this.resonanceScaling = 20;

  gui.add(this, 'freq').min(0).max(20000).onChange(function(newVal){
    filterNode.frequency.value = newVal;
  });
  gui.add(this, 'Q').min(0).max(30).onChange(function(newVal){
    filterNode.Q.value = newVal;
  });
  gui.add(this, 'loopEnd').min(0).max(4).onChange(function(newVal){
    soundSource.loopEnd = newVal;
  });
  gui.add(this, 'LFORate').min(0).max(20).onChange(function(newVal){
     lfoNode.frequency.value = newVal;
  });
  gui.add(this, 'LFOGain').min(0).max(5000).onChange(function(newVal){
     lfoGain.gain.value = newVal;
  });  
  gui.add(this, 'frequencyScaling').min(0).max(20).onChange(function(newVal){
     frequencyScaling = newVal;
  });
  gui.add(this, 'resonanceScaling').min(0).max(20).onChange(function(newVal){
     resonanceScaling = newVal;
  });
  gui.add(this, 'LFORateScaling').min(0).max(20).onChange(function(newVal){
     LFORateScaling = newVal;
  });  

  //deal defaults
  var leapControlledFrequency = 200;
  var leapControlledLFORate = 10;
  var leapControlledLFOGain = 100;
  var leapControlledResonance = 0;

  //main program loop
  //polls (60xsecond)
  //Leap.loop frame for
  //xyz of hand position ( only open - more than 1 finger )
  //and controls 3 params from synth
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

    filterNode.frequency.value = leapControlledFrequency*10;
    lfoNode.frequency.value = Math.abs(leapControlledLFORate/10);
    filterNode.Q.value = leapControlledResonance/10;
    
    console.log("Filter Frequency : " + filterNode.frequency.value);
    console.log("Filter Resonance : " + filterNode.Q.value);
    console.log("LFO Rate : " + lfoNode.frequency.value);

    console.log("(x,y,z) : " + leapControlledResonance + " " + leapControlledFrequency + " " + leapControlledLFORate);
  });  


});

