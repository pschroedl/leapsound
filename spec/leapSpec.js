describe("Leap Controller", function() {
  var leapController;
  var context = new AudioContext;

  beforeEach(function() {
    filter = new ls.Filter();
  });

  it("should throw an error if not passed an audioContext and source", function() {
    //it should throw an error if not passed an audioContext;
    expect(ls.Zplane()).toThrow(new Error("Cannot create filter - context is undefined"));  
    //it should throw an error if not passed a source;
    expect(ls.filter()).toThrow(new Error("Cannot create filter - source is undefined"));  
  });
  //it should throw an error if not passed a sampler

  //it should throw an error if not passed a context

  //createLeapFilters should return an array of length equal to the parameter passed in as the first argument

  //it should call Leap.loop
});