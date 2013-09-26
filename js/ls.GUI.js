ls.GUI = function (sampler){
/* Query Filter control knobs using ls.Knob.js*/

  this.lpCutoff = new ls.Knob({
    el: "#filter1cutoff",
    max: 22000,
    change: function (newVal) { 
      sampler.filters[0].frequency.value = newVal;
    }
  });

  this.lpResonance = new ls.Knob({
    el: "#filter1q",
    max: 30,
    change: function (newVal) { 
      sampler.filters[0].Q.value = newVal;
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
      sampler.filters[1].frequency.value = newVal;
    }
  });

  this.hpResonance = new ls.Knob({
    el: "#filter2q",
    max: 30,
    change: function (newVal) { 
      sampler.filters[1].Q.value = newVal;
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

  this.filters = [];
  var lpFilter = [this.lpCutoff, this.lpResonance, this.lpGain];
  var hpFilter = [this.hpCutoff, this.hpResonance, this.hpGain];
  this.filters.push(lpFilter);
  this.filters.push(hpFilter);

};