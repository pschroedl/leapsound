var Gui = function (sampler, sample){
  var gui = new dat.GUI();
  this.freq = sampler.filterNode.frequency.value;
  this.Q = sampler.filterNode.Q.value;
  this.loopStart = sample.loopStart;
  this.loopEnd = sample.loopEnd;
  this.LFORate = sampler.lfoNode.frequency.value;
  this.LFOGain = sampler.lfoGain.gain.value;
  this.hiPassCutoff = sampler.highPassFilterNode.frequency.value;
  this.bandPassCutoff = sampler.bandPassFilterNode.frequency.value;

  gui.add(this, 'freq').min(0).max(20000)
  .onChange(function(newVal){
    sampler.filterNode.frequency.value = newVal;
  });
  gui.add(this, 'Q').min(0).max(30)
  .onChange(function(newVal){
    sampler.filterNode.Q.value = newVal;
  });
  gui.add(this, 'loopStart').min(0).max(1)
  .onChange(function(newVal){
    sample.loopStart = newVal;
  });
  gui.add(this, 'loopEnd').min(0).max(1)
  .onChange(function(newVal){
    sample.loopEnd = newVal;
  });
  gui.add(this, 'LFORate').min(0).max(20)
  .onChange(function(newVal){
    sampler.lfoNode.frequency.value = newVal;
  });
  gui.add(this, 'LFOGain').min(0).max(5000)
  .onChange(function(newVal){
    sampler.lfoGain.gain.value = newVal;
  });
  gui.add(this, 'hiPassCutoff').min(0).max(20000)
  .onChange(function(newVal){
    sampler.highPassFilterNode.frequency.value = newVal;
  });
  gui.add(this, 'bandPassCutoff').min(0).max(20000)
  .onChange(function(newVal){
    sampler.bandPassFilterNode.frequency.value = newVal;
  });

  var Knob = function(attributeValues){
    //attributeValues is an array object containing min, max,angleOffset,AngleArc,fgcolor, and target object
    //in that order.

    this.properties = {}

    //params object and defaults
    var parameters = [
      'min',
      'max',
      'angleOffset',
      'angleArc',
      'fgcolor',
      'target' ];

    for(var i = 0; i < attributeValues.length; i++ ){
      this[parameters[i]] = attributeValues[i];
    }

  }

  $("#frequency")
    .knob({
      'min':100,
      'max':20000,
      'angleOffset':-125,
      'angleArc':250,
      'fgcolor':"#66EE66",
      'change' : function (newVal) { 
      sampler.filterNode.frequency.value = newVal; 
      console.log(newVal);},
    });

  $("#resonance")
    .knob({
      'min':0,
      'max':30,
      'angleOffset':-125,
      'angleArc':250,
      'fgcolor':"#66EE66",
      'change' : function (newVal) { 
      sampler.filterNode.frequency.value = newVal; 
      console.log(newVal);},
    });

    $("#lforate")
    .knob({
      'min':0,
      'max':20,
      'angleOffset':-125,
      'angleArc':250,
      'fgcolor':"#66EE66",
      'change' : function (newVal) { 
      sampler.filterNode.frequency.value = newVal; 
      console.log(newVal);},
    });

};