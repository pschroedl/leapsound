var ZPlaneSampler = function(source, context){

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
  var filterType;

  //Attach filter to the splitter then back to merger
  source.connect(this.splitterNode);

  for(var i = 0; i < 4; i++ ){
    if (i % 2){
      filterType = "bandpass";
    }else{
      filterType = "lowpass";
    }
    this.filters.push(new ls.Filter(context, {type: filterType}));
    this.filterGain[i] = context.createGain();
    this.filters[i].output = this.filterGain[i];
    this.filterGain[i].connect(this.mergerNode);
    this.filters[i].min = 0;
    this.filters[i].max = 1000;
  }

  this.splitterNode.connect(this.filters[0].input, 0);
  this.splitterNode.connect(this.filters[1].input, 1);
  this.splitterNode.connect(this.filters[2].input, 0);
  this.splitterNode.connect(this.filters[3].input, 1);

  this.outputGainNode = context.createGain();
  this.outputGainNode.gain.value = .3;
  
  this.compressorNode = context.createDynamicsCompressor();

  this.mergerNode.connect(this.outputGainNode);
  this.outputGainNode.connect(context.destination);
  //this.compressorNode.connect(context.destination);
}