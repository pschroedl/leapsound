$(document).ready(function(){

  var audioContext = initAudioContext();  //throws error if Web Audio API or webkitAudio API is not avail.
  
  var soundSource = audioContext.createBufferSource();

  var sampler =  new ZPlaneSampler(soundSource, audioContext);

  //var visualizer = new Visualizer($(".webGLContainer"));

/* Load sample file over http to our buffer */
  
  var getSample = new XMLHttpRequest(); 
  getSample.open("GET","zyfoDrez.wav",true);
  getSample.responseType = "arraybuffer";
  getSample.onload = function(){
    var soundBuffer = audioContext.createBuffer(getSample.response,false) //flag is set for stereo
    soundSource.buffer = soundBuffer;
    soundSource.loop = true;
    soundSource.start(0);
  };  
  getSample.send();

/* View Param Init, View GUI. Init */

  var sliders =  new Gui(sampler,soundSource);
  leapControl(sampler, soundSource, sliders);
  
});

