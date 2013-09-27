var leapControl = function(sampler, soundSource){
/* Default var setting, control assignments */
  var x = 0;
  var y = 0;
  var z = 0;
  
  var xRange = 300;
  var yRange = 690;
  var zRange = 300;

  var resonanceRange = [40,40,40,40];

  var filters = sampler.filters;
  var filtergain = sampler.filterGain;

  var createLeapFilters = function(channels){
    var filterArray = [];
    for (var i = 0; i < channels; i ++){
      var filter = new ls.LeapControlledFilter({frequency: 100, resonance: 10, gain: 100});
      filterArray.push(filter);
    }
    return filterArray;
  };

  var updateFilters = function(leapFilters,i,x,y,z){
    //scales the leap vertical range into range of samplers filters

    leapFilters[i].frequency = ((y*filters[i].max)/yRange) + filters[i].min; 

    //translates leap horizontal range to sampler resonance range
    leapFilters[i].resonance = (x*resonanceRange[i])/xRange;

    //translates from -300 to 300 into a ~ 0-1 range
    //slightly magic number 1.5 and negation to get desired
    //todo - make logarithmic?
    leapFilters[i].gain = -((z/zRange)-1.5)/2;
    //sets values in each web audio api filter
    sampler.filters[i].frequency = leapFilters[i].frequency;
    sampler.filters[i].resonance = leapFilters[i].resonance;
    sampler.filterGain[i].gain.value = leapFilters[i].gain/4;

    //updates the user GUI knobs to reflect leap inputs
    ls.gui.filters[i][0].value = leapFilters[i].frequency;
    ls.gui.filters[i][1].value = leapFilters[i].resonance;
    ls.gui.filters[i][2].value = Math.abs(leapFilters[i].gain * 100);
  };

/* Main leap control loop */

  var leapFilters = createLeapFilters(4);
  for (var i = 0; i < 4; i++ ){
    ls.gui.filters[i][0].value = leapFilters[i].frequency;
    ls.gui.filters[i][1].value = leapFilters[i].resonance;
    ls.gui.filters[i][2].value = Math.abs(leapFilters[i].gain * 100);
  }

  Leap.loop(function(frame) {

    if (frame.hands.length < 1){
      return;
    }

    if (frame.hands[0] != undefined){
      //get coordinates of first hand in frame
      x = frame.hands[0].palmPosition[0];
      y = frame.hands[0].palmPosition[1];
      z = frame.hands[0].palmPosition[2];

      //checking for undefined seems to be more consistent than fingers.length
      //one finger for the first two filters, two for both
      if (frame.fingers[0] !== undefined && frame.fingers[1] === undefined){
        updateFilters(leapFilters,0,x,y,z);
        updateFilters(leapFilters,1,x,y,z);
      }else
        if (frame.fingers[1] !== undefined){
          updateFilters(leapFilters,2,x,y,z);
          updateFilters(leapFilters,3,x,y,z);
        } 
      }
      //leapConsole(leapControlled, frame.hands[0], sampler);
  });
};
