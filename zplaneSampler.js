var ZPlaneSampler = function(source, context){
/* An attempt to emulate z-plane filters */
  this.filters = [];
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
  this.filters[0].type = "bandpass";
  this.filters[0].frequency.value = 1000;

  // this.highPassFilterNode = context.createBiquadFilter();
  // this.highPassFilterNode.type = "highpass";
  // this.highPassFilterNode.frequency.value = 1000;
  // this.highPassFilterNode.gain.value = 0;

  // this.bandPassFilterNode = context.createBiquadFilter();
  // this.bandPassFilterNode.type = "lowpass";
  // this.bandPassFilterNode.frequency.value = 1000;

  this.splitterNode = context.createChannelSplitter(1);
  this.mergerNode = context.createChannelMerger(1);

  this.outputGainNode = context.createGain();
  this.outputGainNode.gain.value = 10;
  
  this.compressorNode = context.createDynamicsCompressor();

/* only in here for compatibility */
  //Create Low frequency oscillator
  // this.lfoNode = context.createOscillator();
  // this.lfoNode.type = "sine";
  // this.lfoNode.frequency.value = 10;
  // this.lfoNode.start(0);

  // //Gain node from the LFO to filer
  // this.lfoGain = context.createGain();
  // this.lfoGain.gain.value = 100;
  // this.lfoNode.connect(this.lfoGain);
  // this.lfoGain.connect(this.filterNode.frequency);
/* End only in here for compatibility */

  //Attach filter to the splitter then back to merger
  source.connect(this.splitterNode);
  this.splitterNode.connect(this.filters[0], 0);
//  this.splitterNode.connect(this.highPassFilterNode, 1);
//  this.splitterNode.connect(this.bandPassFilterNode, 2);
  this.filters[0].connect(this.mergerNode);
//  this.highPassFilterNode.connect(this.mergerNode);
// this.bandPassFilterNode.connect(this.mergerNode);

  this.mergerNode.connect(this.outputGainNode);
  this.outputGainNode.connect(this.compressorNode);
  this.compressorNode.connect(context.destination);
}