$(document).ready(function(){
  var audioContext;

// Not all all browsers support AudioContext - use webKit prefix for safari
  if (typeof AudioContext !== "undefined") {
      audioContext = new AudioContext();
  } else if (typeof webkitAudioContext !== "undefined") {
      audioContext = new webkitAudioContext();
  } else {
      throw new Error('AudioContext not supported - try Google Chrome Canary');
  }

  //initialize sound source/buffer
  var soundSource = audioContext.createBufferSource();

  //load sample file over http to our buffer
  var sampleReq = new XMLHttpRequest(); 
  sampleReq.open("GET","pzBeat.mp3",true);
  sampleReq.responseType = "arraybuffer";
  sampleReq.onload = function(){
    var soundBuffer = audioContext.createBuffer(sampleReq.response,false) //flag is set for stereo
    soundSource.buffer = soundBuffer;
    soundSource.loop = true;
    soundSource.noteOn(0);
  };

  //create/connect lowpass filter
  var filterNode = audioContext.createBiquadFilter();
  filterNode.type = 0;
  filterNode.frequency.value = 1000;

  //create Low frequency oscillator
  var lfoNode = audioContext.createOscillator();
  lfoNode.type = "sine";
  lfoNode.frequency = 300;
  lfoNode.connect(filterNode);
  //attach filter and reverb into the chain
  soundSource.connect(filterNode);
  filterNode.connect(audioContext.destination);

  //play output
  sampleReq.send();
  
  //dat.gui provides sliders for parameters
  var gui = new dat.GUI();
  this.freq = filterNode.frequency.value;
  this.Q = filterNode.Q.value;
  this.loopEnd = soundSource.loopEnd;
  //this.LFORate = lfoNode.value;

  gui.add(this, 'freq').min(0).max(20000).onChange(function(newVal){
    filterNode.frequency.value = newVal;
  });
  gui.add(this, 'Q').min(0).max(30).onChange(function(newVal){
    filterNode.Q.value = newVal;
  });
  gui.add(this, 'loopEnd').min(0).max(4).onChange(function(newVal){
    soundSource.loopEnd = newVal;
  });
  // gui.add(this, 'LFORate').min(0).max(100).onChange(function(newVal){
  //   soundSource.loopEnd = newVal;
  // });

  var leapControlledFrequency = 200;
  var leapControlledLFORate = 10;
  var leapControlledResonance = 0;

  Leap.loop(function(frame) {
    if (frame.hands.length < 1){
      return;
    }

    if (frame.hands.length >= 1){
      leapControlledFrequency = frame.data.hands[0].palmPosition[1];
    }
    if (frame.hands.length === 2){
      //leapControlledResonance = frame.data.hands[1].palmPosition[1];
      
    }


    filterNode.frequency.value = leapControlledFrequency*10;  //change to generic param 1, param 2
    
    //filterNode.Q.value = leapControlledResonance/20;
  });  


});

