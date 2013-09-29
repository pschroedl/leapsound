var leapControl = function(sampler, soundSource){
/* Default var setting, control assignments */
  var x = 0;
  var y = 0;
  var z = 0;
  
  var xRange = 300;
  var yRange = 690;
  var zRange = 300;
  
  var resonanceRange = [40,40,40,40];
  var filterCenter;
  var filterRange;
  var translation;
  var filters = sampler.filters;
  var filtergain = sampler.filterGain;

  var createLeapFilters = function(channels){
    var filterArray = [];
    for (var i = 0; i < channels; i ++){
      var filter = new ls.LeapControlledFilter({frequency: 11000, resonance: 10, gain: 100});
      filterArray.push(filter);
    }
    return filterArray;
  };

  var updateFilters = function(leapFilters,i,x,y,z){
    filterCenter = ls.gui.filters[i][0].value;
    filterRange = sampler.filters[i].range;

    //scales the leap vertical range into range of samplers filters
    leapFilters[i].frequency = ((y*filters[i].max)/yRange) + filters[i].min; 
    translation = leapFilters[i].frequency - (filterRange/2);
    
    // if(i % 2){
    //   translation = translation * -1;
    // }
    console.log("translation :" + translation);

    //translates leap horizontal range to sampler resonance range
    leapFilters[i].resonance = (x*resonanceRange[i])/xRange;

    //translates from -300 to 300 into a ~ 0-1 range
    //slightly magic number 1.5 and negation to get desired
    //todo - make logarithmic?
    leapFilters[i].gain = -((z/zRange)-1.5)/2;
    //sets values in each web audio api filter
    sampler.filters[i].frequency = translation;
    sampler.filters[i].resonance = leapFilters[i].resonance;
    sampler.filterGain[i].gain.value = leapFilters[i].gain/4;

    //updates the user GUI knobs to reflect leap inputs
    ls.gui.filters[i][0].value = translation;
    ls.gui.filters[i][1].value = leapFilters[i].resonance;
    ls.gui.filters[i][2].value = Math.abs(leapFilters[i].gain * 100);
  };

  var leapFilters = createLeapFilters(4);
  for (var i = 0; i < 4; i++ ){
    ls.gui.filters[i][0].value = leapFilters[i].frequency;
    ls.gui.filters[i][1].value = leapFilters[i].resonance;
    ls.gui.filters[i][2].value = Math.abs(leapFilters[i].gain * 100);
  }

  /* Main leap control loop */

  Leap.loop(function(frame) {

    if (frame.hands.length < 1 || frame.fingers[0] === undefined){
      return;
    }

    if (frame.hands[0] != undefined){
      //get coordinates of first hand in frame
      x = frame.hands[0].palmPosition[0];
      y = frame.hands[0].palmPosition[1];
      z = frame.hands[0].palmPosition[2];

      //checking for undefined seems to be more consistent than fingers.length
      //one finger for the first two filters, two for the second, open hand for both

      if (frame.fingers[0] !== undefined && frame.fingers[1] === undefined){
        updateFilters(leapFilters,0,x,y,z);
        sampler.filterGain[1].gain.value = 0;
        sampler.filterGain[2].gain.value = 0;
        ls.gui.filters[1][2].value = 0;
        ls.gui.filters[1][2].value = 0;
      }else
        if (frame.fingers[1] !== undefined && frame.fingers[2] === undefined){
          updateFilters(leapFilters,1,x,y,z);
          sampler.filterGain[0].gain.value = 0;
          sampler.filterGain[2].gain.value = 0;
          ls.gui.filters[0][2].value = 0;
          ls.gui.filters[2][2].value = 0;
        } else
          if (frame.fingers[1] !== undefined &&frame.fingers[2] !== undefined && frame.fingers[3] === undefined){
            updateFilters(leapFilters,2,x,y,z);
            sampler.filterGain[0].gain.value = 0;
            sampler.filterGain[1].gain.value = 0;
            ls.gui.filters[0][2].value = 0;
            ls.gui.filters[1][2].value = 0;
          } else
            if (frame.fingers[3] !== undefined || frame.fingers[4] !== undefined){
              updateFilters(leapFilters,0,x,y,z);
              updateFilters(leapFilters,1,x,y,z);
              updateFilters(leapFilters,2,x,y,z);
              //updateFilters(leapFilters,3,x,y,z);
            }
      }
      ls.Log(leapFilters, frame.hands[0], sampler, this);
  });
};
