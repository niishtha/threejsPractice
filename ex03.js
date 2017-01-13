function createSquare() {
    var container = document.getElementById('container');
    renderer = new THREE.WebGLRenderer();
    container.appendChild(renderer.domElement)
    renderer.setSize(container.offsetWidth, container.offsetHeight)

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, 2, 1, 2000);
    camera.position.set(0, 0, 3);

    scene.add(camera);

    var material = new THREE.MeshPhongMaterial({
        color: 0xff00ff
    });

    var loader = new THREE.TextureLoader();
    loader.load(
        'background.png',
        function(texture) {
            console.log("hello 123")
            material.map = texture;
            material.needsUpdate = true;
            renderer.render(scene, camera);
        }
    );

    mesh = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), material);

    mesh.rotation.z = Math.PI / 4;
    mesh.rotation.y = Math.PI / 4;

    var light = new THREE.DirectionalLight()
    light.position.set(1, 1, 4);
    scene.add(light);

    scene.add(mesh);
    //run()
    renderer.render(scene, camera);

}

function run() {
    // Render the scene
    renderer.render(scene, camera);
    // Spin the cube for next frame
    // if (animating)
    // {
    mesh.rotation.y -= 0.01;
    // }

    // Ask for another frame
    requestAnimationFrame(run);
}

var renderer, scene, camera, mesh;

createSquare();
