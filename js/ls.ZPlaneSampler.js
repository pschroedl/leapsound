var ZPlaneSampler = function(source, context){
/* An attempt to emulate z-plane filters */
  this.filters = [];
  this.filterGain = [];
  this.filterLFOs = [];

  var createNode = function(context, soundContext, attributes){
    // for attribute in attributes {
    //    //context[attribute.key] = attribute.value;
    //    //case of attribute.key being lopass, context.createbiquad + type = lopass
    //    //Use Delegation table!!

    //    //types to handle - Oscillator, Filter, LFO

    //    //pass in context, soundContext,
    //    //and list of attributes
    //    //that reflect the webAPI specs

    //    //return node - implicit in prototypal
    // }
  };

  //Create filters, splitter/merger, gain and compressor
  this.filters[0] = context.createBiquadFilter();
  this.filters[0].type = "lowpass";
  this.filters[0].frequency.value = 1000;

  this.filters[1] = context.createBiquadFilter();
  this.filters[1].type = "highpass";
  this.filters[1].frequency.value = 1000;

  this.splitterNode = context.createChannelSplitter(2);
  this.mergerNode = context.createChannelMerger(2);

  this.outputGainNode = context.createGain();
  this.outputGainNode.gain.value = 10;
  
  this.compressorNode = context.createDynamicsCompressor();

  //Attach filter to the splitter then back to merger
  source.connect(this.splitterNode);
  this.splitterNode.connect(this.filters[0], 0);
  this.splitterNode.connect(this.filters[1], 1);

  this.filterGain[0] = context.createGain();
  this.filterGain[1] = context.createGain();

  this.filters[0].connect(this.filterGain[0]);
  this.filters[1].connect(this.filterGain[1]);

  this.filterGain[0].connect(this.mergerNode);
  this.filterGain[1].connect(this.mergerNode);

  this.mergerNode.connect(this.outputGainNode);
  this.outputGainNode.connect(context.destination);
  //this.compressorNode.connect(context.destination);
}