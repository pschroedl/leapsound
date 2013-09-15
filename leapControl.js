var leapControl = function(sampler){
/* Default var setting, control assignments */
  var leapControlled = {};
  leapControlled.Frequency = 200;
  leapControlled.LFORate = 10;
  leapControlled.LFOGain = 100;
  leapControlled.Resonance = 0;

/* Main leap control loop */

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
};
