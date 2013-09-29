ls.Log = function(leapFilters, leapHand, sampler){
  console.clear();

  console.log("(x,y,z) : "
    + leapHand.palmPosition[0]
    + " " 
    + leapHand.palmPosition[1] 
    + " " 
    + leapHand.palmPosition[2]);
  
  console.log("# of fingers :" + leapHand.fingers.length);
};