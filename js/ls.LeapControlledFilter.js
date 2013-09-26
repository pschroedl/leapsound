  ls.LeapControlledFilter = function(options){
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

  ls.LeapControlledFilter.prototype.options = {
    frequency: 0,
    Resonance: 0,
    Gain: 0
  };
