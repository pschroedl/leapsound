var ZPlaneSampler = function(source, context){
/* An attempt to emulate z-plane filters */
  this.filters = [];
  this.filterGain = [];
  this.filterLFOs = [];

  ls.FilterChain = function(context, soundContext, attributes){

  };

  //Create filters, splitter/merger, gain and compressor
  this.filters[0] = context.createBiquadFilter();
  this.filters[0].type = "bandpass";
  this.filters[0].frequency.value = 80;
  this.filters[0].min = 0;
  this.filters[0].max = 22000;

  this.filters[1] = context.createBiquadFilter();
  this.filters[1].type = "bandpass";
  this.filters[1].frequency.value = 600;
  this.filters[1].min = 0;
  this.filters[1].max = 22000;

  this.filters[2] = context.createBiquadFilter();
  this.filters[2].type = "bandpass";
  this.filters[2].frequency.value = 1000;
  this.filters[2].min = 0;
  this.filters[2].max = 22000;

  this.filters[3] = context.createBiquadFilter();
  this.filters[3].type = "lowpass";
  this.filters[3].frequency.value = 1000;
  this.filters[3].min = 0;
  this.filters[3].max = 22000;

  this.splitterNode = context.createChannelSplitter(4);
  this.mergerNode = context.createChannelMerger(4);

  //Attach filter to the splitter then back to merger
  source.connect(this.splitterNode);
  this.splitterNode.connect(this.filters[0], 0);
  this.splitterNode.connect(this.filters[1], 1);
  this.splitterNode.connect(this.filters[2], 0);
  this.splitterNode.connect(this.filters[3], 1);

  this.filterGain[0] = context.createGain();
  this.filterGain[1] = context.createGain();
  this.filterGain[2] = context.createGain();
  this.filterGain[3] = context.createGain();

  this.filters[0].connect(this.filterGain[0]);
  this.filters[1].connect(this.filterGain[1]);
  this.filters[2].connect(this.filterGain[2]);
  this.filters[3].connect(this.filterGain[3]);

  this.filterGain[0].connect(this.mergerNode);
  this.filterGain[1].connect(this.mergerNode);
  this.filterGain[2].connect(this.mergerNode);
  this.filterGain[3].connect(this.mergerNode);

  this.outputGainNode = context.createGain();
  this.outputGainNode.gain.value = .3;
  
  this.compressorNode = context.createDynamicsCompressor();

  this.mergerNode.connect(this.outputGainNode);
  this.outputGainNode.connect(context.destination);
  //this.compressorNode.connect(context.destination);
}