describe("sampler", function() {
  var sampler;
  var context = ls.initAudioContext.js();
  var soundSource = audioContext.createBufferSource();

  beforeEach(function() {
    sampler = new ls.ZplaneSampler(context, soundSource);
  });


  it("should throw an error if not passed an audioContext and source", function() {
    //it should throw an error if not passed an audioContext;
    expect(ls.Zplane()).toThrow(new Error("Cannot create filter - context is undefined"));  
    //it should throw an error if not passed a source;
    expect(ls.filter()).toThrow(new Error("Cannot create filter - source is undefined"));  
  });

});