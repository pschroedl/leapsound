var leapControl = function(sampler, soundSource, sliders, visualizer){
/* Default var setting, control assignments */
  var leapControlled = {};
  leapControlled.Frequency = 200;
  leapControlled.LFORate = 10;
  leapControlled.LFOGain = 80;
  leapControlled.Resonance = 0;

/* Main leap control loop */

  Leap.loop(function(frame) {
    if (frame.hands.length < 1){
      //outputGain.gain.value = 0;  
        //sampler.filterNode.frequency.value = 30000;
        sampler.lfoNode.frequency.value = 0;
        sampler.filterNode.Q.value = 0;
        visualizer.cube.position.x = 50;
        visualizer.cube.position.y = 50;
        visualizer.cube.position.z = 50; 
      return;
    }

    if (frame.hands.length >= 1){
      if (frame.hands[0].fingers.length >= 2){
        var leapHand = frame.data.hands[0];
        //outputGain.gain.value = 10;
        leapControlled.Frequency = leapHand.palmPosition[1];
        leapControlled.LFORate = leapHand.palmPosition[2];
        leapControlled.Resonance = leapHand.palmPosition[0];

        leapControlled.palmNormalX = leapHand.palmNormal[0];
        leapControlled.palmNormalY = leapHand.palmNormal[1];
        leapControlled.palmNormalZ = leapHand.palmNormal[2];
      }
    }

    //Assign changed gui.param and leap values to synth properties

    //sampler.filterNode.frequency.value = leapControlled.Frequency*10;
    sampler.lfoNode.frequency.value = Math.abs(leapControlled.LFORate/10);
    sampler.filterNode.Q.value = leapControlled.Resonance/10;

    visualizer.cube.position.x = leapControlled.Resonance;
    visualizer.cube.position.y = leapControlled.Frequency;
    visualizer.cube.position.z = leapControlled.LFORate; 
    visualizer.cube.rotation.x = leapControlled.LFOGain;

    $("#frequency").val(leapControlled.Frequency).trigger('change');
    $("#resonance").val(leapControlled.Resonance).trigger('change');
    $("#lforate").val(leapControlled.LFORate).trigger('change');

    leapConsole(leapControlled);
    visualizer.renderer.render(visualizer.scene, visualizer.camera);
  });
};
