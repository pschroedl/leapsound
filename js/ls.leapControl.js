var leapControl = function(sampler, soundSource, sliders, visualizer){
/* Default var setting, control assignments */

  var LeapControlledFilter = function(options){
    this.options = $.extend({}, this.options, options);
    
    Object.defineProperty(this, 'frequency', {
      set: function(val) {
        this.options.frequency = val;
      },
      get: function(){
        return this.options.frequency;
      }
    });

    Object.defineProperty(this, 'resonance', {
      set: function(val) {
        this.options.resonance = val;
      },
      get: function(){
        return this.options.resonance;
      }
    });

    Object.defineProperty(this, 'gain', {
      set: function(val) {
        this.options.gain = val;
      },   
      get: function(){
        return this.options.gain;
      }
    });

  };

  LeapControlledFilter.prototype.options = {
    frequency: 0,
    Resonance: 0,
    Gain: 0
  };

  var x = 0;
  var y = 0;
  var z = 0;
  
  var xRange = 300;
  var yRange = 690;
  var zRange = 300;

  var resonanceRange = [40,30];

  var filters = sampler.filters;
  var filtergain = sampler.filterGain;

  var createLeapFilters = function(channels){
    var filterArray = [];
    for (var i = 0; i < 2; i ++){
      var filter = new LeapControlledFilter();
      filterArray.push(filter);
    }
    return filterArray;
  };

  var leapFilters = createLeapFilters(2);

  var updateFilters = function(leapFilters,i,x,y,z){
    //the original "range"
    //leapControlled.Frequency1 = (y*22000)/690;
    //move these rainging equations into sampler
    leapFilters[i].frequency = ((y*filters[i].max)/yRange) + filters[i].min; 
    //translates 0 to 300 into 1 to 30
    leapFilters[i].resonance = (x*resonanceRange[i])/xRange;
    //translates from -300 to 300 into a ~ 0-1 range
    //slightly magic number 1.5 and negation to get desired
    //behavior from leap - make logarithmic?
    leapFilters[i].gain = -((z/zRange)-1.5)/2;


    sampler.filters[i].frequency.value = leapFilters[i].frequency;
    sampler.filters[i].Q.value = leapFilters[i].frequency;
    sampler.filterGain[i].gain.value = leapFilters[i].gain/4;

    ls.gui.lpCutoff.value = leapFilters[i].frequency;
    ls.gui.lpResonance.value = leapFilters[i].resonance;
    ls.gui.lpGain.value = Math.abs(leapFilters[i].gain * 100);
  };

/* Main leap control loop */

  Leap.loop(function(frame) {
    
    if (frame.hands.length < 1){
      return;
    }

    if (frame.hands[0] != undefined){
        x = frame.hands[0].palmPosition[0];
        y = frame.hands[0].palmPosition[1];
        z = frame.hands[0].palmPosition[2];

      console.log(leapFilters);
      for (var i = 0; i < 2; i++){
          debugger;
          updateFilters(leapFilters,i,x,y,z);
      }
    }
    //leapConsole(leapControlled, frame.hands[0], sampler);
  });
};
