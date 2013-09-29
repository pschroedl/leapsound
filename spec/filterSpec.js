describe("Filter", function() {
  var filter;
  var context = ls.initAudioContext();

  beforeEach(function() {
    filter = new ls.Filter();
  });

  it("should throw an error if not passed an audioContext", function() {
    expect(ls.filter()).toThrow(new Error("Cannot create filter - context is undefined"));  
  });

  //it should have getters and setters

  //it should have a default type

  //it should have frequency, resonance, and gain properties
});