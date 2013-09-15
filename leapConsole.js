var leapConsole = function(leapControlled){

    console.clear();
    console.log("Filter Frequency : " 
      + leapControlled.Frequency);
    console.log("Filter Resonance : " 
      + leapControlled.Resonance);
    console.log("LFO Rate : " 
      + leapControlled.LFORate);

    console.log("(x,y,z) : "
      + leapControlled.Resonance 
      + " " 
      + leapControlled.Frequency 
      + " " 
      + leapControlled.LFORate);
    console.log("testing!3");
}