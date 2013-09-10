//not all all browsers support WebAudio API : AudioContext - use webKit prefaced for safari
//TODO : move to init func
if (typeof AudioContext !== "undefined") {
    var context = new AudioContext();
} else {
  if (typeof webkitAudioContext !== "undefined") {
    var context = new webkitAudioContext();
} else {
  throw new Error('WebAudio not supported - Try using Chrome or Safari');
}

//initialize sound source/buffer
var soundSource = context.createBufferSource();

//load sample file over http to our buffer
//TODO : move to a service for the sampler
var ajaxReq = new XMLHttpRequest(); 
ajaxReq.open("GET","pzBeat.mp3",true);
ajaxReq.responseType = "arraybuffer";

//callback to start audio
ajaxReq.onload = function(){
  var soundBuffer = context.createBuffer(ajaxReq.response,false) //flag is set for stereo
  soundSource.buffer = soundBuffer;
  soundSource.loop = true;
  soundSource.noteOn(0);
};

//create/connect LP filter
var filterNode = context.createBiquadFilter();
filterNode.type = 0;  //lowpass
filterNode.frequency.value = 1000;

//attach LP filter into the chain
soundSource.connect(filterNode);
filterNode.connect(context.destination);

$(document).ready(function(){
  //Get Mp3 and start playing
  ajaxReq.send();

  var leapControlledFrequency = 200;
  var leapControlledResonance = 0;

  //using sliders for testing of sampler/filter engine
  //TODO : move this out of this synth into view controller
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

    if (frame.hands.length >= 1){
      leapControlledFrequency = frame.data.hands[0].palmPosition[1];
    }

    if (frame.hands.length === 2){
      leapControlledResonance = frame.data.hands[1].palmPosition[1];
    }

    filterNode.frequency.value = leapControlledFrequency*10;
    filterNode.Q.value = leapControlledResonance/20;]
  });  

});

