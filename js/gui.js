var Gui = function (sampler, sample){
  var gui = new dat.GUI();
  this.freq = [];
  this.Q = [];
  this.filterGain = [];
  this.freq[0] = sampler.filters[0].frequency.value;
  this.Q[0] = sampler.filters[0].Q.value;
  this.loopStart = sample.loopStart;
  this.loopEnd = sample.loopEnd;
  //this.LFORate = sampler.lfoNode.frequency.value;
  //this.LFOGain = sampler.lfoGain.gain.value;
//  this.hiPassCutoff = sampler.highPassFilterNode.frequency.value;
  //this.bandPassCutoff = sampler.bandPassFilterNode.frequency.value;

  // var DatGui = function(context, gui, name, parameter, min, max){
  //   gui.add(context, name).min(min).max(max)
  //     .onChange(function(newVal) {
  //       parameter = newVal
  //     })
  // };

  var Knob = function(attributeValues){
    //attributeValues is an array object containing min, 
    //max,angleOffset,angleArc,fgcolor, and target object
    //in that order.

    //params object and defaults
    this.parameters = [
      'min',
      'max',
      'angleOffset',
      'angleArc',
      'fgcolor',
      'target' ];

    for(var i = 0; i < attributeValues.length; i++ ){
      this[parameters[i]] = attributeValues[i];  //is this legal? seems too easy
    }

  };

  // gui.add(this, 'freq').min(0).max(20000)
  //   .onChange(function(newVal){
  //     sampler.filterNode.frequency.value = newVal;
  // });
  // gui.add(this, 'Q').min(0).max(30)
  //   .onChange(function(newVal){
  //     sampler.filterNode.Q.value = newVal;
  // });
  // gui.add(this, 'loopStart').min(0).max(1)
  //   .onChange(function(newVal){
  //     sample.loopStart = newVal;
  // });
  // gui.add(this, 'loopEnd').min(0).max(1)
  //   .onChange(function(newVal){
  //     sample.loopEnd = newVal;
  // });
  // gui.add(this, 'LFORate').min(0).max(20)
  //   .onChange(function(newVal){
  //     sampler.lfoNode.frequency.value = newVal;
  // });
  // gui.add(this, 'LFOGain').min(0).max(5000)
  // .onChange(function(newVal){
  //   sampler.lfoGain.gain.value = newVal;
  // });
  // gui.add(this, 'hiPassCutoff').min(0).max(20000)
  //   .onChange(function(newVal){
  //     sampler.highPassFilterNode.frequency.value = newVal;
  // });
  // gui.add(this, 'bandPassCutoff').min(0).max(20000)
  //   .onChange(function(newVal){
  //     sampler.bandPassFilterNode.frequency.value = newVal;
  // });

  $("#filter1cutoff")
    .knob({
      'min':0,
      'max':22000,
      'angleOffset':-125,
      'angleArc':250,
      'fgcolor':"#66EE66",
      'change' : function (newVal) { 
      sampler.filters[0].frequency.value = newVal; 
      console.log(newVal);},
    });

  $("#filter1q")
    .knob({
      'min':0,
      'max':30,
      'angleOffset':-125,
      'angleArc':250,
      'fgcolor':"#66EE66",
      'change' : function (newVal) { 
      sampler.filters[0].Q.value = newVal; 
      console.log(newVal);},
    });

  $("#filter1gain")
    .knob({
      'min':0,
      'max':1,
      'angleOffset':-125,
      'angleArc':250,
      'fgcolor':"#66EE66",
      'change' : function (newVal) { 
      sampler.filterGain[0].value = newVal; 
      console.log(newVal);},
    });

  $("#filter1lforate")
    .knob({
      'min':0,
      'max':20,
      'angleOffset':-125,
      'angleArc':250,
      'fgcolor':"#66EE66",
      'change' : function (newVal) { 
      sampler.filterLFOs[0].frequency.value = newVal; 
      console.log(newVal);},
    });

  $("#filter1lfogain")
    .knob({
      'min':0,
      'max':10,
      'angleOffset':-125,
      'angleArc':250,
      'fgcolor':"#66EE66",
      'change' : function (newVal) { 
      sampler.filterLFOs[0].gain.value = newVal; 
      console.log(newVal);},
    });

  $("#filter2cutoff")
    .knob({
      'min':0,
      'max':22000,
      'angleOffset':-125,
      'angleArc':250,
      'fgcolor':"#66EE66",
      'change' : function (newVal) { 
      sampler.filters[1].frequency.value = newVal; 
      console.log(newVal);},
    });

  $("#filter2gain")
    .knob({
      'min':0,
      'max':1,
      'angleOffset':-125,
      'angleArc':250,
      'fgcolor':"#66EE66",
      'change' : function (newVal) { 
      sampler.filterGain[0].value = newVal; 
      console.log(newVal);},
    });

  $("#filter2q")
    .knob({
      'min':0,
      'max':30,
      'angleOffset':-125,
      'angleArc':250,
      'fgcolor':"#66EE66",
      'change' : function (newVal) { 
      sampler.filters[1].Q.value = newVal; 
      console.log(newVal);},
    });

  $("#filter2lforate")
    .knob({
      'min':0,
      'max':20,
      'angleOffset':-125,
      'angleArc':250,
      'fgcolor':"#66EE66",
      'change' : function (newVal) { 
      sampler.filterLFOs[1].frequency.value = newVal; 
      console.log(newVal);},
    });

  $("#filter2lfogain")
    .knob({
      'min':0,
      'max':10,
      'angleOffset':-125,
      'angleArc':250,
      'fgcolor':"#66EE66",
      'change' : function (newVal) { 
      sampler.filterLFOs[1].gain.value = newVal; 
      console.log(newVal);},
    });

};