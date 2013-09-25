var leapControl = function(sampler, soundSource, sliders, visualizer){
/* Default var setting, control assignments */
  var leapControlled = {};
  leapControlled.Frequency1 = 200;  
  leapControlled.Frequency2 = 22000;
  leapControlled.Resonance1 = 0;
  leapControlled.Resonance2 = 0;
  leapControlled.LFORate = 10;
  leapControlled.LFOGain = 80;

  var x = 0;
  var y = 0;
  var z = 0;

/* Main leap control loop */

  Leap.loop(function(frame) {
    if (frame.hands.length < 1){
      console.log("returning out of leap loop");
      return;
    }

    if (frame.hands[0] != undefined){
        x = frame.hands[0].palmPosition[0];
        y = frame.hands[0].palmPosition[1];
        z = frame.hands[0].palmPosition[2];

       if (frame.hands[0].fingers.length === 1){
        leapControlled.Frequency1 = (y*22000)/690;
        leapControlled.Resonance1 = (x*30)/300;
        leapControlled.LFORate = z;

        $("#filter1cutoff").val(leapControlled.Frequency1).trigger('change');
        $("#filter1q").val(leapControlled.Resonance1).trigger('change');
        //$("#filter1lforate").val(frame.hands[0].palmPosition[2]).trigger('change');

        // sampler.filters[0].frequency.value = leapControlled.Frequency1;
        // //sampler.lfoNode.frequency.value = Math.abs(leapControlled.LFORate/10);
        // sampler.filters[0].Q.value = leapControlled.Resonance1/10;
      } else
      {
        leapControlled.Frequency2 = (y*22000)/690;
        leapControlled.Resonance2 = (x*30)/300;
        leapControlled.LFORate = z;

        $("#filter2cutoff").val(leapControlled.Frequency2).trigger('change');
        $("#filter2q").val(leapControlled.Resonance2).trigger('change');
        //$("#filter1lforate").val(frame.hands[0].palmPosition[2]).trigger('change');

        // sampler.filters[0].frequency.value = leapControlled.Frequency2;
        // //sampler.lfoNode.frequency.value = Math.abs(leapControlled.LFORate/10);
        // sampler.filters[0].Q.value = leapControlled.Resonance2/10;
      }
    }

    //Assign changed gui.param and leap values to synth properties

    // sampler.filters[0].frequency.value = leapControlled.Frequency1*10;
    // //sampler.lfoNode.frequency.value = Math.abs(leapControlled.LFORate/10);
    // sampler.filters[0].Q.value = leapControlled.Resonance1/10;

    // sampler.highPassFilterNode = leapControlled.Frequency2*10;

    // $("#frequency").val(sampler.filters[0].frequency.value).trigger('change');
    // $("#resonance").val(leapControlled.Resonance).trigger('change');
    // $("#lforate").val(leapControlled.LFORate).trigger('change');
    // $("#hpfreq").val(leapControlled.Frequency2*10).trigger('change');

    leapConsole(leapControlled, frame.hands[0]);
  });
};
