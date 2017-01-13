const DEG_30 = Math.PI / 6,
    DEG_45 = Math.PI / 4,
    DEG_60 = Math.PI / 3;

function createCube() {
    let renderer = common.createRenderer({
            container: "container"
        }),
        scene = common.createScene(),
        camera = common.createCamera([0, 0, 3]),
        light = common.createLight([2, 1, 2]),
        //light = common.createAmbientLight(undefined, .7),
        //cubeGeometry = common.createGeometry('cube', [0.5, 0.5, 0.5]),
        cubeGeometry = common.createGeometry('sphere', [0.25, 32, 32]),
        material = common.createMaterial('phong', {
            color: 0xefefef
        }),
        mesh = common.createMesh(cubeGeometry, material);

    common.addAssetsToScreen(scene, camera);
    common.addAssetsToScreen(scene, light);
    common.addAssetsToScreen(scene, mesh);
    common.textureLoader('../images/earth_surface.jpg', texture => {
        material.map = texture;
        material.needsUpdate = true;
        common.render(renderer, scene, camera);
    });
    common.rotate(mesh, {
        x: DEG_60,
        y: -DEG_30
    })
    common.render(renderer, scene, camera);

    function run(timestamp) {
        common.rotate(mesh, {
            y: mesh.rotation.y - 0.005
        });
        common.render(renderer, scene, camera);
        window.requestAnimationFrame(run)
    }
    run();
}

createCube();
