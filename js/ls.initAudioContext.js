  var initAudioContext = function(){
    /* Check for HTML5 Web Audio - use webKit prefix for safari Web Audio API*/
    /* todo: add support for Firefox Web Audio Data API? */
    var context;
    if (typeof AudioContext !== "undefined") {
        context = new AudioContext();
    } else if (typeof webkitAudioContext !== "undefined") {
        context = new webkitAudioContext();
    } else {
        throw new Error('AudioContext not supported - try Google Chrome Canary');
    }
    return context;
  };
