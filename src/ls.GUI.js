ls.GUI = function (sampler){
/* Query Filter control knobs using ls.Knob.js*/

  this.lpCutoff = new ls.Knob({
    el: "#filter1cutoff",
    max: 22000,
    change: function (newVal) { 
      sampler.filters[0].frequency = newVal;
    }
  });

  this.lpResonance = new ls.Knob({
    el: "#filter1q",
    max: 30,
    change: function (newVal) { 
      sampler.filters[0].resonance = newVal;
    }
  });

  this.lpGain = new ls.Knob({
    el: "#filter1gain",
    min: 0,
    max: 100,
    change: function (newVal) { 
      sampler.filterGain[0].gain.value = newVal/100; 
    }
  });

  this.hpCutoff = new ls.Knob({
    el: "#filter2cutoff",
    max: 22000,
    change: function (newVal) { 
      sampler.filters[1].frequency = newVal;
    }
  });

  this.hpResonance = new ls.Knob({
    el: "#filter2q",
    max: 30,
    change: function (newVal) { 
      sampler.filters[1].resonance = newVal;
    }
  });

  this.hpGain = new ls.Knob({
    el: "#filter2gain",
    min: 0,
    max: 100,
    change: function (newVal) { 
      sampler.filterGain[1].gain.value = newVal/100; 
    }
  });

  this.bpCutoff = new ls.Knob({
    el: "#filter3cutoff",
    max: 22000,
    change: function (newVal) { 
      sampler.filters[2].frequency = newVal;
    }
  });

  this.bpResonance = new ls.Knob({
    el: "#filter3q",
    max: 30,
    change: function (newVal) { 
      sampler.filters[2].resonance = newVal;
    }
  });

  this.bpGain = new ls.Knob({
    el: "#filter3gain",
    min: 0,
    max: 100,
    change: function (newVal) { 
      sampler.filterGain[2].gain.value = newVal/100; 
    }
  });

  this.spCutoff = new ls.Knob({
    el: "#filter4cutoff",
    max: 22000,
    change: function (newVal) { 
      sampler.filters[3].frequency = newVal;
    }
  });

  this.spResonance = new ls.Knob({
    el: "#filter4q",
    max: 30,
    change: function (newVal) { 
      sampler.filters[3].resonance = newVal;
    }
  });

  this.spGain = new ls.Knob({
    el: "#filter4gain",
    min: 0,
    max: 100,
    change: function (newVal) { 
      sampler.filterGain[3].gain.value = newVal/100; 
    }
  });

  this.filters = [];
  var lpFilter = [this.lpCutoff, this.lpResonance, this.lpGain];
  var hpFilter = [this.hpCutoff, this.hpResonance, this.hpGain];
  var bpFilter = [this.bpCutoff, this.bpResonance, this.bpGain];
  var spFilter = [this.spCutoff, this.spResonance, this.spGain];
  this.filters.push(lpFilter);
  this.filters.push(hpFilter);
  this.filters.push(bpFilter);
  this.filters.push(spFilter);

};