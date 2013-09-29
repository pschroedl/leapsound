ls.ZPlaneSampler = function(source, context){

  //We can't make a routing graph without a context!
  if (context === undefined){
    throw new Error('Cannot create sampler - context is undefined.');
  }

  if (source === undefined){
    throw new Error('Cannot create sampler - source is undefined.');
  }

/* An attempt to emulate z-plane filters */
  this.filters = [];
  this.filterGain = [];
  this.filterLFOs = [];
  this.splitterNode = context.createChannelSplitter(4);
  this.mergerNode = context.createChannelMerger(4);
  this.dryGain = context.createGain();
  var filterType = "lowpass";

  //Attach filter to the splitter then back to merger
  source.connect(this.splitterNode);

  for(var i = 0; i < 4; i++ ){
    this.filters.push(new ls.Filter(context, {type: filterType}));
    this.filterGain[i] = context.createGain();
    this.filters[i].output = this.filterGain[i];
    this.filterGain[i].connect(this.mergerNode);
    this.filters[i].min = 0;
    this.filters[i].max = 1000;
  }

  this.filters[0].type = "lowpass";
  this.filters[1].type = "highpass";
  this.filters[2].type = "bandpass";

  this.splitterNode.connect(this.filters[0].input, 0);
  this.splitterNode.connect(this.filters[1].input, 1);
  this.splitterNode.connect(this.filters[2].input, 0);

  this.splitterNode.connect(this.dryGain, 1);

  this.dryGain.connect(this.mergerNode);

  this.outputGainNode = context.createGain();
  this.outputGainNode.gain.value = .3;
  
  this.compressorNode = context.createDynamicsCompressor();

  this.mergerNode.connect(this.outputGainNode);
  this.outputGainNode.connect(context.destination);
  //this.compressorNode.connect(context.destination);
}