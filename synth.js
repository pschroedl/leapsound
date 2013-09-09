
var context;

// Not all all browsers support AudioContext - use webKit prefaced for safari
  if (typeof AudioContext !== "undefined") {
      context = new AudioContext();
  } else if (typeof webkitAudioContext !== "undefined") {
      context = new webkitAudioContext();
  } else {
      throw new Error('AudioContext not supported. :(');
  }

  //initialize sound source/buffer
  var soundSource = context.createBufferSource();

  //load sample file over http to our buffer
  var ajaxReq = new XMLHttpRequest(); 
  ajaxReq.open("GET","pzBeat.mp3",true);
  ajaxReq.responseType = "arraybuffer";
  ajaxReq.onload = function(){
    //should I use decodeAudioBuffer here?
    var soundBuffer = context.createBuffer(ajaxReq.response,false) //flag is set for stereo
    soundSource.buffer = soundBuffer;
    soundSource.loop = true;
    soundSource.noteOn(0);
    console.log("loaded mp3");
  };

  //create/connect lowpass filter
  var filterNode = context.createBiquadFilter();
  filterNode.type = 0;
  filterNode.frequency.value = 1000;
  //attach it into the chain
  soundSource.connect(filterNode);
  filterNode.connect(context.destination);



$(document).ready(function(){
  //play output
  ajaxReq.send();

  var leapControlledFrequency = 200;
  var leapControlledResonance = 0;

  //useing slider for now,
  //connect to lowpass filter
  //move this out of this synth file eventually

  $(".freqSlider").change(function(){
    $(".freqDisplay").text(this.value);
    filterNode.frequency.value = this.value*100;
  });

  $(".qSlider").change(function(){
    $(".qDisplay").text(this.value);
    filterNode.Q.value = this.value;
  });
  
  Leap.loop(function(frame) {

    if (frame.hands.length < 1){
      return;
    }

    if (frame.hands.length === 1){
      //debugger;
      leapControlledFrequency = frame.data.hands[0].palmPosition[1];
      //console.log(frame.hands[0].palmPosition.y);
    }
    if (frame.hands.length === 2){
      leapControlledResonance = frame.data.hands[1].palmPosition[1];
    }

    filterNode.frequency.value = leapControlledFrequency*10;
    filterNode.Q.value = leapControlledResonance/20;
    $(".freqDisplay").value = leapControlledFrequency*10;
    $(".qDisplay").value = leapControlledResonance;
    console.log("Frequency" + leapControlledFrequency);
    console.log("Resonance" + leapControlledResonance);
  });  

});

