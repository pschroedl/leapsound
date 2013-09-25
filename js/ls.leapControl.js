var leapControl = function(sampler, soundSource, sliders, visualizer){
/* Default var setting, control assignments */
  var leapControlled = {};
  leapControlled.Frequency1 = 200;  
  leapControlled.Frequency2 = 22000;
  leapControlled.Resonance1 = 0;
  leapControlled.Resonance2 = 0;
  leapControlled.Gain1 = 0;
  leapControlled.Gain2 = 0;

  var x = 0;
  var y = 0;
  var z = 0;

/* Main leap control loop */

  Leap.loop(function(frame) {
    if (frame.hands.length < 1){
      return;
    }

    if (frame.hands[0] != undefined){
        x = frame.hands[0].palmPosition[0];
        y = frame.hands[0].palmPosition[1];
        z = frame.hands[0].palmPosition[2];

       if (frame.hands[0].fingers.length === 1){
        leapControlled.Frequency1 = (y*22000)/690;
        leapControlled.Resonance1 = (x*30)/300;
        leapControlled.Gain1 = z/300;

        sampler.filters[0].frequency.value = leapControlled.Frequency1;
        sampler.filters[0].Q.value = leapControlled.Resonance1;
        sampler.filterGain[0].gain.value = leapControlled.Gain1;

        ls.gui.lpCutoff.value = leapControlled.Frequency1;
        ls.gui.lpResonance.value = leapControlled.Resonance1;
        ls.gui.lpGain.value = leapControlled.Gain1 * 100;

      } else
      {
        leapControlled.Frequency2 = (y*22000)/690;
        leapControlled.Resonance2 = (x*30)/300;
        leapControlled.Gain2 = z/300;

        sampler.filters[1].frequency.value = leapControlled.Frequency2;
        sampler.filters[1].Q.value = leapControlled.Resonance2;
        sampler.filterGain[1].gain.value = leapControlled.Gain2;

        ls.gui.hpCutoff.value = leapControlled.Frequency2;
        ls.gui.hpResonance.value = leapControlled.Resonance2;
        ls.gui.hpGain.value = leapControlled.Gain2 * 100;
      }
    }
    
    leapConsole(leapControlled, frame.hands[0], sampler);
  });
};
