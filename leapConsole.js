var leapConsole = function(leapControlled){
    console.clear();
    console.log("Filter Frequency : " 
      + leapControlled.Frequency);
    console.log("Filter Resonance : " 
      + leapControlled.Resonance);
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
    
    console.log("PalmNormal (x,y,z) : "
      + leapControlled.palmNormalX
      + " " 
      + leapControlled.palmNormalY
      + " " 
      + leapControlled.palmNormalZ);
}