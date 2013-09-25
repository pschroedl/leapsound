var leapConsole = function(leapControlled){
    console.clear();
    console.log("Filter Frequency1 : " 
      + leapControlled.Frequency1);
    console.log("Filter Resonance1 : " 
      + leapControlled.Resonance1);
    console.log("Filter Frequency2 : " 
      + leapControlled.Frequency2);
    console.log("Filter Resonance2 : " 
      + leapControlled.Resonance2);
    console.log("LFO Rate : " 
      + leapControlled.LFORate);
    console.log("LFO Rate : " 
      + leapControlled.HighPassFreq);

    console.log("(x,y,z) : "
      + leapControlled.Resonance 
      + " " 
      + leapControlled.Frequency 
      + " " 
      + leapControlled.LFORate);
}