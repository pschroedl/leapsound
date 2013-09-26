var leapControl = function(sampler, soundSource){
/* Default var setting, control assignments */
  var x = 0;
  var y = 0;
  var z = 0;
  
  var xRange = 300;
  var yRange = 690;
  var zRange = 300;

  var resonanceRange = [40,30];

  var filters = sampler.filters;
  var filtergain = sampler.filterGain;

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

  var createLeapFilters = function(channels){
    var filterArray = [];
    for (var i = 0; i < 2; i ++){
      var filter = new LeapControlledFilter();
      filterArray.push(filter);
    }
    return filterArray;
  };

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
debugger;
    
    sampler.filters[i].frequency.value = leapFilters[i].frequency;
    sampler.filters[i].Q.value = leapFilters[i].resonance;
    sampler.filterGain[i].gain.value = leapFilters[i].gain/4;

    ls.gui.filters[i][0].value = leapFilters[i].frequency;
    ls.gui.filters[i][1].value = leapFilters[i].resonance;
    ls.gui.filters[i][2].value = Math.abs(leapFilters[i].gain * 100);
  };

/* Main leap control loop */

  var leapFilters = createLeapFilters(2);

  Leap.loop(function(frame) {

    if (frame.hands.length < 1){
      return;
    }

    if (frame.hands[0] != undefined){
      x = frame.hands[0].palmPosition[0];
      y = frame.hands[0].palmPosition[1];
      z = frame.hands[0].palmPosition[2];
      if (frame.fingers[0] !== undefined && frame.fingers[1] === undefined){
        updateFilters(leapFilters,0,x,y,z);
      }
      if (frame.fingers[1] !== undefined){
        updateFilters(leapFilters,1,x,y,z);
      } 
    }
    //leapConsole(leapControlled, frame.hands[0], sampler);
  });
};
