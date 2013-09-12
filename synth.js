$(document).ready(function(){
  var audioContext;

// Not all all browsers support AudioContext - use webKit prefaced for safari
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
  var ajaxReq = new XMLHttpRequest(); 
  ajaxReq.open("GET","pzBeat.mp3",true);
  ajaxReq.responseType = "arraybuffer";
  ajaxReq.onload = function(){
    var soundBuffer = audioContext.createBuffer(ajaxReq.response,false) //flag is set for stereo
    soundSource.buffer = soundBuffer;
    soundSource.loop = true;
    soundSource.noteOn(0);
  };

  //create/connect lowpass filter
  var filterNode = audioContext.createBiquadFilter();
  filterNode.type = 0;
  filterNode.frequency.value = 1000;

  //attach filter into the chain
  soundSource.connect(filterNode);
  filterNode.connect(audioContext.destination);

  //play output
  ajaxReq.send();

  //dat.gui provides sliders for parameters
  var gui = new dat.GUI();
  this.freq = filterNode.frequency.value;
  this.Q = filterNode.Q.value;
  gui.add(this, 'freq').min(0).max(20000).onChange(function(newVal){
    filterNode.frequency.value = newVal;
  });
  gui.add(this, 'Q').min(0).max(30).onChange(function(newVal){
    filterNode.Q.value = newVal;
  });

  var leapControlledFrequency = 200;
  var leapControlledResonance = 0;
  
  Leap.loop(function(frame) {
    if (frame.hands.length < 1){
      return;
    }

    if (frame.hands.length >= 1){
      leapControlledFrequency = frame.data.hands[0].palmPosition[1];
    }
    if (frame.hands.length === 2){
      leapControlledResonance = frame.data.hands[1].palmPosition[1];
    }

    filterNode.frequency.value = leapControlledFrequency*10;
    filterNode.Q.value = leapControlledResonance/20;
  });  


});

