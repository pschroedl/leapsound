var leapControl = function(sampler, soundSource, sliders, visualizer){
/* Default var setting, control assignments */
  var leapControlled = {};
  leapControlled.Frequency = 200;
  leapControlled.LFORate = 10;
  leapControlled.LFOGain = 80;
  leapControlled.Resonance = 0;

/* Main leap control loop */

  Leap.loop(function(frame) {
    if (frame.hands.length < 1){
        sampler.lfoNode.frequency.value = 0;
        sampler.filterNode.Q.value = 0;
      return;
    }

    if (frame.hands.length >= 1){
      if (frame.hands[0].fingers.length >= 2){
        var leapHand = frame.data.hands[0];
        leapControlled.Frequency = leapHand.palmPosition[1];
        leapControlled.LFORate = leapHand.palmPosition[2];
        leapControlled.Resonance = leapHand.palmPosition[0];

        leapControlled.palmNormalX = leapHand.palmNormal[0];
        leapControlled.palmNormalY = leapHand.palmNormal[1];
        leapControlled.palmNormalZ = leapHand.palmNormal[2];
      }
    }

    //Assign changed gui.param and leap values to synth properties

    sampler.filterNode.frequency.value = leapControlled.Frequency*10;
    sampler.lfoNode.frequency.value = Math.abs(leapControlled.LFORate/10);
    sampler.filterNode.Q.value = leapControlled.Resonance/10;

    $("#frequency").val(leapControlled.Frequency).trigger('change');
    $("#resonance").val(leapControlled.Resonance).trigger('change');
    $("#lforate").val(leapControlled.LFORate).trigger('change');

    leapConsole(leapControlled);
  });
};
