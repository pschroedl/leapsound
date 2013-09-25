ls.GUI = function (sampler, sample){
  // var gui = new dat.GUI();
  // this.loopStart = sample.loopStart;
  // this.loopEnd = sample.loopEnd;

  // gui.add(this, 'loopStart').min(0).max(1)
  //   .onChange(function(newVal){
  //     sample.loopStart = newVal;
  // });
  // gui.add(this, 'loopEnd').min(0).max(1)
  //   .onChange(function(newVal){
  //     sample.loopEnd = newVal;

  // $("#filter1cutoff").knob(
  //   $.extend({}, params, {
  //     'change': function (newVal) { 
  //       sampler.filters[0].frequency.value = newVal; 
  //     }
  //   })
  // );

  this.lpCutoff = new ls.Knob({
    el: "#filter1cutoff",
    max: 22000,
    change: function (newVal) { 
      sampler.filters[0].frequency.value = newVal;
      console.log("filter 1 cutoff val" + newVal);
    }
  });

  this.lpResonance = new ls.Knob({
    el: "#filter1q",
    max: 30,
    change: function (newVal) { 
      sampler.filters[0].Q.value = newVal;
      console.log("filter 1 q val" + newVal);
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

};