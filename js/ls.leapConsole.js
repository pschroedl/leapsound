var leapConsole = function(leapControlled, leapHand1, sampler){
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
      + leapHand1.palmPosition[0]
      + " " 
      + leapHand1.palmPosition[1] 
      + " " 
      + leapHand1.palmPosition[2]);
    
    console.log("# of fingers :" + leapHand1.fingers.length);

    console.log("Sampler Gain 1: " + sampler.filterGain[0].gain.value );
    console.log("Sampler Gain 2: " + sampler.filterGain[1].gain.value );

}