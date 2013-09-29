
  ls.Filter = function(context, options){

    //We can't make a filter without a context!
    if (context === undefined){
      throw new Error('Cannot create filter - context is undefined');
    }

    this.filter = context.createBiquadFilter();
    this.filter2 = context.createBiquadFilter();
    this.filter.connect(this.filter2);


    if (options.type){
      this.filter.type = options.type;
    }
    if (options.min){
      this.filter.min = options.min;
    }
    if (options.max){
      this.filter.max = options.max;
    }

    Object.defineProperty(this, 'type', {
      set: function(val) {
        this.filter.type = val;
        this.filter2.type = val;
      },
      get: function(){
        return this.filter.type;
      }
    });

    Object.defineProperty(this, 'frequency', {
      set: function(val) {
        this.filter.frequency.value = val;
        this.filter2.frequency.value = val;
      },
      get: function(){
        return this.filter.frequency.value;
      }
    });

    Object.defineProperty(this, 'resonance', {
      set: function(val) {
        this.filter.Q.value = val;
        this.filter2.Q.value = val;
      },
      get: function(){
        return this.filter.Q.value;
      }
    });

    Object.defineProperty(this, 'min', {
      set: function(val) {
        this.filter.frequency.minValue = val;
        this.filter2.frequency.minValue = val;
      },
      get: function(){
        return this.filter.frequency.minValue;
      }
    });

    Object.defineProperty(this, 'max', {
      set: function(val) {
        this.filter.frequency.maxValue = val;
        this.filter2.frequency.maxValue = val;
      },
      get: function(){
        return this.filter.frequency.maxValue;
      }
    });

    Object.defineProperty(this, 'center', {
      get: function(){
        return ((this.filter.frequency.maxValue - this.filter.frequency.minValue)/2) +this.filter.frequency.minValue;
      }
    });


    Object.defineProperty(this, 'range', {
      get: function(){
        return this.filter.frequency.maxValue - this.filter.frequency.minValue;
      }
    });

    Object.defineProperty(this, 'input', {
      get: function() {
        return this.filter;
      }
    });

    Object.defineProperty(this, 'output', {
      set: function(val) {
        this.filter2.connect(val);
      }
    });
  };

  ls.Filter.prototype.options = {
    type : 'lowpass',
    frequency : 0,
    min : 0,
    max : 22000,
    detune : 0
  };