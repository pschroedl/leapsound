var Visualizer = function(container){

  this.scene = new THREE.Scene();
  //this.container = container;
  this.renderer = new THREE.WebGLRenderer();
  // { canvas : this.container.get(0) } 
  this.renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild(this.renderer.domElement);

  var geometry = new THREE.CubeGeometry( 200, 200, 200 );

  for ( var i = 0; i < geometry.faces.length; i ++ ) {
    geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );
  }

  var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors } );
   
  this.cube = new THREE.Mesh( geometry, material );
  this.cube.position.y = 50;
  this.cube.position.z = 50; 
  this.cube.position.x = 50;

  this.scene.add(this.cube);

  this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  this.camera.position.x = 0;
  this.camera.position.y = 0;
  this.camera.position.z = 1000;

  this.renderer.render(this.scene, this.camera);

}