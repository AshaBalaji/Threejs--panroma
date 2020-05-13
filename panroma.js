


var camera, scene, renderer,panorama, raycaster, mouse,group,controls,geometry,material,cube;
var ADD = 0.05;
var isMouseDown = true;
var cubeB;
var isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0;

init();
animate();

function init() {

    

    var container, mesh;

    container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 110000 );
    camera.target = new THREE.Vector3( 0, 0, 0 );
    camera.position.x = 5;
    camera.position.y = 50;
    camera.position.z = 80;
    

    scene = new THREE.Scene();

    var geometry = new THREE.SphereGeometry( 500, 60, 40 );
    geometry.scale( - 1, 1, 1 );

    var material = new THREE.MeshBasicMaterial( {
        map: new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/2294472375_24a3b8ef46_o.jpg' )
    } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );


   

 

//     var geometry1 = new THREE.SphereGeometry( 500, 60, 40 );
//     geometry1.scale( - 1, 1, 1 );


//      var material2 = new THREE.MeshBasicMaterial( {
//         map: new THREE.TextureLoader().load( 'https://z-axonweb.imgix.net/b0c1b918dd409348a2468b11c7f0eddc7b14deab/Front_View-2.jpg' )
//  } );

//     mesh1= new THREE.Mesh( geometry1, material2 );
//    scene.add( mesh1 );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

  
     document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'wheel', onDocumentMouseWheel, false );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableZoom = true;
    controls.autoRotate = true;
    geometry = new THREE.BoxGeometry(1,1,1);
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
   cube = new THREE.Mesh(geometry,material);
   scene.add(cube);
   
  cube.position.z = 6;
  cube.rotation.x = 10;
  cube.rotation.y = 5;
//  controls.update();

   
    // hotspot

    var geometryPoint = new THREE.BoxBufferGeometry( 1, 1, 1 );
    var materialPoint = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    
    // var cubeA = new THREE.Mesh( geometryPoint, materialPoint );
    // cubeA.position.set( 100, 100, 0 );
    
    var cubeB = new THREE.Mesh( geometryPoint, materialPoint );
    cubeB.position.set( -30, 0, -40 );
    
    //create a group and add the two cubes
    //These cubes can now be rotated / scaled etc as a group
     group = new THREE.Group();
    // group.add( cubeA );
    group.add( cubeB );
    
    scene.add( group );

    cubeB.callback = function() {
        console.log("click cube!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    }

    raycaster = new THREE.Raycaster()
    mouse = new THREE.Vector2();


    document.addEventListener( 'dragover', function ( event ) {

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';

    }, false );

    document.addEventListener( 'dragenter', function ( event ) {

        document.body.style.opacity = 0.5;

    }, false );

    document.addEventListener( 'dragleave', function ( event ) {

        document.body.style.opacity = 1;

    }, false );

    document.addEventListener( 'drop', function ( event ) {

        event.preventDefault();

        var reader = new FileReader();
        reader.addEventListener( 'load', function ( event ) {

            material.map.image.src = event.target.result;
            material.map.needsUpdate = true;

        }, false );
        reader.readAsDataURL( event.dataTransfer.files[ 0 ] );

        document.body.style.opacity = 1;

    }, false );

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseDown( event ) {

    event.preventDefault();
    isUserInteracting = true;
    

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 -1;
    mouse.y = -( event.clientY / renderer.domElement.clientHeight ) *2 +1;

    raycaster.setFromCamera( mouse, camera )
    

//    scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000));

    var intersects = raycaster.intersectObjects(group.children,true)
    if( intersects.length > 0 ) {
        intersects[0].object.callback()
    }

    // camera.traget=cube.position;
    // console.log(cube.position);
    
    isMouseDown = !isMouseDown;

}

function onDocumentMouseMove( event ) {

    if ( isUserInteracting === true ) {

        lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
        lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

    }

}

function onDocumentMouseUp( event ) {

    isUserInteracting = false;

}

function onDocumentMouseWheel( event ) {

    camera.fov += event.deltaY * 0.05;
    camera.updateProjectionMatrix();

}

function animate() {

    requestAnimationFrame( animate );
    
   update();

}

// // window.addEventListener('mousemove', onMouseMove, false);
// //   createHotspot.addEventListener('click', onClick, false);

// //   function onClick(event){
//     direction = material.clone().sub(to);
//     arrowHelper.add(new THREE.ArrowHelper(direction.normalize(), material, 1, 0xff0000));

// //  }

// function toggleWaypoint(){
    

// `mesh.material=material2;
// }



function update() {

    if(isMouseDown) {
        cube.rotation.y +=0.1;
    } else {
        cube.rotation.y = 0;
    }


    if ( isUserInteracting === false ) {

         lon += 0.6;

    }

    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    camera.target.y = 500 * Math.cos( phi );
    camera.target.z = 500 * Math.sin( theta );

    //camera.lookAt(cube.position);
    camera.lookAt( camera.target );

   

    /*
    // distortion
    camera.position.copy( camera.target ).negate();
    */

    renderer.render( scene, camera );

}

