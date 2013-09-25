var leapControl = function(sampler, soundSource, sliders, visualizer){
/* Default var setting, control assignments */
  var leapControlled = {};
  leapControlled.Frequency1 = 200;  
  leapControlled.Frequency2 = 200;
  leapControlled.Resonance1 = 0;
  leapControlled.Resonance2 = 0;
  leapControlled.LFORate = 10;
  leapControlled.LFOGain = 80;

/* Main leap control loop */

  Leap.loop(function(frame) {
    if (frame.hands.length < 1){
      return;
    }

    if (frame.hands.length >= 1){
      if (frame.hands[0].fingers.length >= 2){
        var leapHand = frame.data.hands[0];
        leapControlled.Frequency1 = leapHand.palmPosition[1];
        leapControlled.LFORate = leapHand.palmPosition[2];
        leapControlled.Resonance1 = leapHand.palmPosition[0];
      }
    }

    if (frame.hands.length === 2){
        leapControlled.HighPassFreq = frame.data.hands[1].palmPosition[1];
    }

    //Assign changed gui.param and leap values to synth properties

    sampler.filters[0].frequency.value = leapControlled.Frequency1*10;
    sampler.lfoNode.frequency.value = Math.abs(leapControlled.LFORate/10);
    sampler.filters[0].Q.value = leapControlled.Resonance1/10;

    sampler.highPassFilterNode = leapControlled.Frequency2*10;

    $("#frequency").val(sampler.filters[0].frequency.value).trigger('change');
    $("#resonance").val(leapControlled.Resonance).trigger('change');
    $("#lforate").val(leapControlled.LFORate).trigger('change');
    $("#hpfreq").val(leapControlled.Frequency2*10).trigger('change');

    leapConsole(leapControlled);
  });
};
