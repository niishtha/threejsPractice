window.onload = init

function init() {
    let renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setClearColor(0xffffff, 1);

    document.body.appendChild(renderer.domElement);

    let scene = new THREE.Scene({
        fog: true //new THREE.fog(0xa0a0ff,5,50)
    });

    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 20)

    scene.add(camera);


    let ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight)

    let controls = new THREE.OrbitControls( camera );
  	controls.addEventListener( 'change', function(){
  		renderer.render(scene, camera)
  	} );

    let geometry = new THREE.PlaneGeometry(5, 5),
        material = new THREE.MeshPhongMaterial({
            // opacity: 0.5,
            // overdraw: 0.5,
            color: 0xff00ff,
            //emissive: 0x072534,
			side: THREE.DoubleSide,
			shading: THREE.FlatShading
        }),
        plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI/4
    scene.add(plane);

    renderer.render(scene, camera)
}
