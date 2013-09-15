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

  leapControl(sampler);
  
});

