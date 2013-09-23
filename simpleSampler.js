var SimpleSampler = function(source, context){
/* Synth Signal Flow Definition 
  soundSource.buffer ==> filterNode ==> outputGainNode
  lfoNode=>lfoGain=>filterNode.Frequency^
*/

  //Create/connect lowpass filter
  this.filterNode = context.createBiquadFilter();
  this.filterNode.type = "lowpass";
  this.filterNode.frequency.value = 1000;

  //Create Low frequency oscillator
  this.lfoNode = context.createOscillator();
  this.lfoNode.type = "sine";
  this.lfoNode.frequency.value = 10;
  this.lfoNode.start(0);

  //Gain node from the LFO to filer
  this.lfoGain = context.createGain();
  this.lfoGain.gain.value = 100;
  this.lfoNode.connect(this.lfoGain);
  this.lfoGain.connect(this.filterNode.frequency);

  this.outputGainNode = context.createGain();
  this.outputGainNode.gain.value = 10;
  
  this.compressorNode = context.createDynamicsCompressor();

  //Attach filter to the Main Volume then output
  source.connect(this.filterNode);
  this.filterNode.connect(this.outputGainNode);
  this.outputGainNode.connect(this.compressorNode);
  this.compressorNode.connect(context.destination);
}