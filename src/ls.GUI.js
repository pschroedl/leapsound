ls.GUI = function (sampler){
/* Filter control knobs using ls.Knob.js*/

  this.f1Cutoff = new ls.Knob({
    el: "#filter1cutoff",
    max: 8000,
    change: function (newVal) { 
      sampler.filters[0].frequency = newVal;
    }
  });

  this.f1Resonance = new ls.Knob({
    el: "#filter1q",
    max: 15,
    change: function (newVal) { 
      sampler.filters[0].resonance = newVal;
    }
  });

  this.f1Gain = new ls.Knob({
    el: "#filter1gain",
    min: 0,
    max: 100,
    change: function (newVal) { 
      sampler.filterGain[0].gain.value = newVal/100; 
    }
  });

  this.f2Cutoff = new ls.Knob({
    el: "#filter2cutoff",
    max: 8000,
    change: function (newVal) { 
      sampler.filters[1].frequency = newVal;
    }
  });

  this.f2Resonance = new ls.Knob({
    el: "#filter2q",
    max: 15,
    change: function (newVal) { 
      sampler.filters[1].resonance = newVal;
    }
  });

  this.f2Gain = new ls.Knob({
    el: "#filter2gain",
    min: 0,
    max: 100,
    change: function (newVal) { 
      sampler.filterGain[1].gain.value = newVal/100; 
    }
  });

  this.f3Cutoff = new ls.Knob({
    el: "#filter3cutoff",
    max: 8000,
    change: function (newVal) { 
      sampler.filters[2].frequency = newVal;
    }
  });

  this.f3Resonance = new ls.Knob({
    el: "#filter3q",
    max: 15,
    change: function (newVal) { 
      sampler.filters[2].resonance = newVal;
    }
  });

  this.f3Gain = new ls.Knob({
    el: "#filter3gain",
    min: 0,
    max: 100,
    change: function (newVal) { 
      sampler.filterGain[2].gain.value = newVal/100; 
    }
  });

  this.filters = [];
  var f1Filter = [this.f1Cutoff, this.f1Resonance, this.f1Gain];
  var f2Filter = [this.f2Cutoff, this.f2Resonance, this.f2Gain];
  var f3Filter = [this.f3Cutoff, this.f3Resonance, this.f3Gain];
  this.filters.push(f1Filter);
  this.filters.push(f2Filter);
  this.filters.push(f3Filter);

};