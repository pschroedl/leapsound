var ZPlaneSampler = function(source, context){
/* An attempt to emulate z-plane filters */
  this.filters = [];
  this.filterGain = [];
  this.filterLFOs = [];
  this.splitterNode = context.createChannelSplitter(4);
  this.mergerNode = context.createChannelMerger(4);

  //Attach filter to the splitter then back to merger
  source.connect(this.splitterNode);

  for(var i = 0; i < 4; i++ ){
    this.filters.push(new ls.Filter(context, {type:"bandpass"}));
    this.filterGain[i] = context.createGain();
    this.filters[i].output = this.filterGain[i];
    this.filterGain[i].connect(this.mergerNode);
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