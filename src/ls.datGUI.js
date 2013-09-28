
ls.datGUI = function(sample, sampler){
  gui = new dat.GUI();

  gui.domElement.style.position = 'absolute';
  gui.domElement.style.top = '0px';
  gui.domElement.style.left = '0px';

  this.loopStart = sample.loopStart;
  this.loopEnd = sample.loopEnd;
  this.filter1min = sampler.filters[0].min;
  this.filter1max = sampler.filters[0].max;
  this.filter2min = sampler.filters[1].min;
  this.filter2max = sampler.filters[1].max;
  this.filter3min = sampler.filters[2].min;
  this.filter3max = sampler.filters[2].max;
  this.filter4min = sampler.filters[3].min;
  this.filter4max = sampler.filters[3].max;
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

  gui.add(this, 'filter1min').min(0).max(22000)
    .onChange(function(newVal){
      filter1min = newVal;
  });

  gui.add(this, 'filter1max').min(0).max(22000)
    .onChange(function(newVal){
      filter1max = newVal;
  });

  gui.add(this, 'filter2min').min(0).max(22000)
    .onChange(function(newVal){
      filter2min = newVal;
  });

  gui.add(this, 'filter2max').min(0).max(22000)
    .onChange(function(newVal){
      filter2max = newVal;
  });

  gui.add(this, 'filter3min').min(0).max(22000)
    .onChange(function(newVal){
      filter3min = newVal;
  });

  gui.add(this, 'filter3max').min(0).max(22000)
    .onChange(function(newVal){
      filter3max = newVal;
  });

  gui.add(this, 'filter4min').min(0).max(22000)
    .onChange(function(newVal){
      filter4min = newVal;
  });

  gui.add(this, 'filter4max').min(0).max(22000)
    .onChange(function(newVal){
      filter4max = newVal;
  });


};