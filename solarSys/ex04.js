const DEG_45 = Math.PI / 4,
    DEG_30 = Math.PI / 6;

function createCube() {
    let renderer = common.createRenderer({
            container: "container"
        }),
        scene = common.createScene(),
        camera = common.createCamera([0, 0, 3]),
        light = common.createLight([2, 1, 2]),
        cubeGeometry = common.createGeometry('cube', [0.5, 0.5, 0.5]),
        material = common.createMaterial('phong', {
            color: 0xefefef
        }),
        mesh = common.createMesh(cubeGeometry, material);

    common.addAssetsToScreen(scene, camera);
    common.addAssetsToScreen(scene, light);
    common.addAssetsToScreen(scene, mesh);
    common.textureLoader('../images/texture1.jpg', texture => {
        material.map = texture;
        material.needsUpdate = true;
        common.render(renderer, scene, camera);
    });
    common.rotate(mesh, {
        x: DEG_45,
        y: -DEG_30
    })
    common.render(renderer, scene, camera);

    function run(timestamp) {
        console.log(timestamp)
        common.rotate(mesh, {
            x: mesh.rotation.x - 0.005
        });
        common.render(renderer, scene, camera);
        window.requestAnimationFrame(run)
    }
    run();
}

createCube();
