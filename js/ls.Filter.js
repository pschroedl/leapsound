
  ls.Filter = function(context, options){

    this.filter = context.createBiquadFilter();

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
        this.filter.type = type;
      },
      get: function(){
        return this.filter.type;
      }
    });

    Object.defineProperty(this, 'frequency', {
      set: function(val) {
        this.filter.frequency.value = val;
      },
      get: function(){
        return this.filter.frequency.value;
      }
    });

    Object.defineProperty(this, 'resonance', {
      set: function(val) {
        this.filter.Q.value = val;
      },
      get: function(){
        return this.filter.Q.value;
      }
    });

    Object.defineProperty(this, 'min', {
      set: function(val) {
        this.filter.min = val;
      },
      get: function(){
        return this.filter.min;
      }
    });

    Object.defineProperty(this, 'max', {
      set: function(val) {
        this.filter.max = val;
      },
      get: function(){
        return this.filter.max;
      }
    });

    Object.defineProperty(this, 'input', {
      get: function() {
        return this.filter;
      }
    });

    Object.defineProperty(this, 'output', {
      set: function(val) {
        this.filter.connect(val);
      }
    });
  };

  ls.Filter.prototype.options = {
    type : 'lowpass',
    frequency : 1,
    min : 0,
    max : 22000,
    detune : 0
  };