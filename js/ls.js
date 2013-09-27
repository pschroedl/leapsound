var ls = {
  init: function() {
    var audioContext = initAudioContext();  //throws error if Web Audio API or webkitAudio API is not avail.
    
    var soundSource = audioContext.createBufferSource();

    var sampler =  new ZPlaneSampler(soundSource, audioContext);

  /* Load sample file over http to our buffer */
    
    var getSample = new XMLHttpRequest(); 
    getSample.open("GET","./assets/05 Whale & Wasp.mp3",true);
    getSample.responseType = "arraybuffer";
    getSample.onload = function(){
      var soundBuffer = audioContext.createBuffer(getSample.response,false) //flag is set for stereo
      soundSource.buffer = soundBuffer;
      soundSource.loop = true;
      soundSource.start(0);
    };  
    getSample.send();

  /* View GUI. Init */

    ls.gui = new ls.GUI(sampler);
    //ls.datdotgui = new ls.datGUI(soundSource, sampler);

  /* Leap Motion control loop */

    leapControl(sampler, soundSource);
    
    $('body').append('<a href="http://hackreactor.com"><img style="position: fixed; top: 0; right: 0; border: 0;" src="http://i.imgur.com/x86kKmF.png" alt="Built at Hack Reactor"></a>');
  }
};
