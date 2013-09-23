var leapControl = function(sampler, soundSource, sliders){
/* Default var setting, control assignments */
  var leapControlled = {};
  leapControlled.Frequency = 200;
  leapControlled.LFORate = 10;
  leapControlled.LFOGain = 80;
  leapControlled.Resonance = 0;

  var scene = new THREE.Scene();
  var container = $(".webGLContainer");
  var renderer = new THREE.WebGLRenderer( { canvas : container.get(0) } );
  renderer.setSize( 500, 500 );
  document.body.appendChild(renderer.domElement);

  var geometry = new THREE.CubeGeometry( 200, 200, 200 );

  for ( var i = 0; i < geometry.faces.length; i ++ ) {
    geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );
  }

  var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors } );
   
  cube = new THREE.Mesh( geometry, material );
  cube.position.y = 50;
  cube.position.z = 50; 
  cube.position.x = 50;

  scene.add(cube);

  var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.x = 0;
  camera.position.y = 150;
  camera.position.z = 500;

  renderer.render(scene, camera);
/* Main leap control loop */


  Leap.loop(function(frame) {
    if (frame.hands.length < 1){
      //outputGain.gain.value = 0;  
        //sampler.filterNode.frequency.value = 30000;
        sampler.lfoNode.frequency.value = 0;
        sampler.filterNode.Q.value = 0;
        cube.position.x = 50;
        cube.position.y = 50;
        cube.position.z = 50; 
      return;
    }

    if (frame.hands.length >= 1){
      if (frame.hands[0].fingers.length >= 2){
        //outputGain.gain.value = 10;
        leapControlled.Frequency = frame.data.hands[0].palmPosition[1];
        leapControlled.LFORate = frame.data.hands[0].palmPosition[2];
        leapControlled.Resonance = frame.data.hands[0].palmPosition[0];

        leapControlled.palmNormalX = frame.data.hands[0].palmNormal[0];
        leapControlled.palmNormalY = frame.data.hands[0].palmNormal[1];
        leapControlled.palmNormalZ = frame.data.hands[0].palmNormal[2];
      }
    }

    //Assign changed gui.param and leap values to synth properties

    //sampler.filterNode.frequency.value = leapControlled.Frequency*10;
    sampler.lfoNode.frequency.value = Math.abs(leapControlled.LFORate/10);
    sampler.filterNode.Q.value = leapControlled.Resonance/10;

    cube.position.x = leapControlled.Resonance;
    cube.position.y = leapControlled.Frequency;
    cube.position.z = leapControlled.LFORate; 
    cube.rotation.x = leapControlled.LFOGain;

    $(".frequency").val(leapControlled.Frequency).trigger('change');
    $(".resonance").val(leapControlled.Resonance).trigger('change');
    $(".lforate").val(leapControlled.LFORate).trigger('change');

    leapConsole(leapControlled);
    renderer.render(scene, camera);
  });
};
