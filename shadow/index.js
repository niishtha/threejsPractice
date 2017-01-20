window.onload = init

function init() {
    //create Renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerWidth)
    document.body.appendChild(renderer.domElement)


    //Create Scene
    var scene = new THREE.Scene();


    var ambientLight = new THREE.AmbientLight(0x00ff00, 0.2)
    scene.add(ambientLight)


    //Create a SpotLight and turn on shadows for the light
    var light = new THREE.SpotLight(0xffffff);
    light.position.set(15, 40, 35);
    light.castShadow = true;
    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 512;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500
    scene.add(light);


    lightHelper = new THREE.SpotLightHelper(light);
    scene.add(lightHelper);



    //create sphere to cast Shadow
    var sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
    var sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    scene.add(sphere);



    //create plane to recieve shadow
    var planeGeometry = new THREE.PlaneGeometry(200, 200, 32, 32);
    var planeMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ff00
    })
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, -10)
    plane.receiveShadow = true;
    scene.add(plane);



    //Create a helper for the shadow camera (optional)
    var helper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(helper);



    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 0, 30);
    scene.add(camera);


    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', function() {
        lightHelper.update();
        renderer.render(scene, camera)
    });

    renderer.render(scene, camera)
}
