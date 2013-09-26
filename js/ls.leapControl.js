var leapControl = function(sampler, soundSource, sliders, visualizer){
/* Default var setting, control assignments */
  var leapControlled = {
    Frequency1: 200, 
    Frequency2: 22000,
    Resonance1: 0,
    Resonance2: 0,
    Gain1: 0,
    Gain2: 0
  };

  var x = 0;
  var y = 0;
  var z = 0;

  var filters = sampler.filters;
  var filtergain = sampler.filterGain;

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
        //leapControlled.Frequency1 = (y*22000)/690;
        leapControlled.Frequency1 = ((y*filters[0].max)/690) + filters[0].min; 
        leapControlled.Resonance1 = (x*30)/300;
        leapControlled.Gain1 = -((z/300)-1.5)/2;

        sampler.filters[0].frequency.value = leapControlled.Frequency1;
        sampler.filters[0].Q.value = leapControlled.Resonance1;
        sampler.filterGain[0].gain.value = leapControlled.Gain1/4;

        ls.gui.lpCutoff.value = leapControlled.Frequency1;
        ls.gui.lpResonance.value = leapControlled.Resonance1;
        ls.gui.lpGain.value = leapControlled.Gain1 * 100;

      } else
      {
        //leapControlled.Frequency2 = (y*22000)/690;
        leapControlled.Frequency2 = ((y*filters[1].max)/690) + filters[1].min; 
        leapControlled.Resonance2 = (x*30)/300;
        leapControlled.Gain2 = -((z/300)-1.5)/2;

        sampler.filters[1].frequency.value = leapControlled.Frequency2;
        sampler.filters[1].Q.value = leapControlled.Resonance2;
        sampler.filterGain[1].gain.value = leapControlled.Gain2/4;

        ls.gui.hpCutoff.value = leapControlled.Frequency2;
        ls.gui.hpResonance.value = leapControlled.Resonance2;
        ls.gui.hpGain.value = Math.abs(leapControlled.Gain2 * 100);
      }
    }
    
    leapConsole(leapControlled, frame.hands[0], sampler);
  });
};
