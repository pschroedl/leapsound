var ZPlaneSampler = function(source, context){
/* An attempt to emulate z-plane filters */
  this.filters = [];
  this.filterGain = [];
  this.filterLFOs = [];

  var createFilterChain = function(context, soundContext, attributes){
    // for attribute in attributes {
    //    //context[attribute.key] = attribute.value;
    //    //case of attribute.key being lopass, context.createbiquad + type = lopass
    //    //Use Delegation table/router?

    //    //pass in context, soundContext,
    //    //and list of attributes
    //    //that reflect the webAPI specs

    //    //return node - implicit in prototypal
    // }
  };

  //Create filters, splitter/merger, gain and compressor
  this.filters[0] = context.createBiquadFilter();
  this.filters[0].type = "lowpass";
  this.filters[0].frequency.value = 80;
  this.filters[0].min = 40;
  this.filters[0].max = 400;

  this.filters[1] = context.createBiquadFilter();
  this.filters[1].type = "lowpass";
  this.filters[1].frequency.value = 600;
  this.filters[1].min = 100;
  this.filters[1].max = 300;

  this.filters[2] = context.createBiquadFilter();
  this.filters[2].type = "lowpass";
  this.filters[2].frequency.value = 1000;
  this.filters[2].min = 300;
  this.filters[2].max = 1000;

  this.filters[3] = context.createBiquadFilter();
  this.filters[3].type = "lowpass";
  this.filters[3].frequency.value = 1000;
  this.filters[3].min = 400;
  this.filters[3].max = 600;

  this.splitterNode = context.createChannelSplitter(4);
  this.mergerNode = context.createChannelMerger(4);

  this.outputGainNode = context.createGain();
  this.outputGainNode.gain.value = 1;
  
  this.compressorNode = context.createDynamicsCompressor();

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

  this.mergerNode.connect(this.outputGainNode);
  this.outputGainNode.connect(context.destination);
  //this.compressorNode.connect(context.destination);
}