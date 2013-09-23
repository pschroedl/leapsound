var Gui = function (sampler, sample){
  var gui = new dat.GUI();
  this.freq = sampler.filterNode.frequency.value;
  this.Q = sampler.filterNode.Q.value;
  this.loopStart = sample.loopStart;
  this.loopEnd = sample.loopEnd;
  this.LFORate = sampler.lfoNode.frequency.value;
  this.LFOGain = sampler.lfoGain.gain.value;

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
};