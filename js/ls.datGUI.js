
ls.datGUI = function(sample, sampler){
  gui = new dat.GUI();

  gui.domElement.style.position = 'absolute';
  gui.domElement.style.top = '0px';
  gui.domElement.style.left = '0px';
debugger;
  this.loopStart = sample.loopStart;
  this.loopEnd = sample.loopEnd;

  document.body.appendChild( gui.domElement );
  
  var loadedSample = sample;

  gui.add(this, 'loopStart').min(0).max(1)
    .onChange(function(newVal){
      loadedSample.loopStart = newVal;
  });

  gui.add(this, 'loopEnd').min(0).max(1)
    .onChange(function(newVal){
      loadedSample.loopEnd = newVal;
  });
};