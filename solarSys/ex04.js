const DEG_30 = Math.PI / 6,
    DEG_45 = Math.PI / 4,
    DEG_60 = Math.PI / 3,
    DEG_90 = Math.PI / 2,
    constUnit = 1,
    speedUnit = 0.01;

var animating = false


function createEarth(scene, renderer) {
    let camera = common.createCamera([0, 10, 45], 90),
        //light = common.createLight([9, 0, 9], undefined, 2),
        //ambientLight = common.createAmbientLight(undefined, .2),
        //cubeGeometry = common.createGeometry('cube', [0.5, 0.5, 0.5]),

        loader = new THREE.TextureLoader(),
        earthGeometry = common.createGeometry('sphere', [constUnit, 32, 32]),
        earth_surface = loader.load('../images/earth_surface.jpg'),
        earth_normal = loader.load('../images/earth_normal.jpg'),
        earth_specular = loader.load('../images/earth_specular.jpg'),
        material = new THREE.MeshPhongMaterial({
            color: 0xefefef,
            map: earth_surface,
            normalMap: earth_normal,
            specularMap: earth_specular,
            needsUpdate: true
        }),
        mesh = common.createMesh(earthGeometry, material),
        group = new THREE.Object3D(),
        groupParent = new THREE.Object3D;

    group.receiveShadow = true;
    group.castShadow = true;



    common.rotate(mesh, {
        x: DEG_30,
        y: -DEG_30
    })

    let cloudMaterial = common.createMaterial('lambert', {
            color: 0xffffff,
            //map: cloudsMap,
            transparent: true
        }),
        cloudMesh = common.createMesh(common.createGeometry('sphere', [constUnit*1.1, 32, 32]), cloudMaterial);

    common.rotate(cloudMesh, {
        x: DEG_30,
        y: -DEG_30
    })
    common.textureLoader('../images/earth_clouds.png', earth_clouds => {
        cloudMaterial.map = earth_clouds;
        cloudMaterial.needsUpdate = true;
        //common.render(renderer, scene, camera);
    });

    common.addAssetsToScreen(scene, camera);
    //common.addAssetsToScreen(scene, light);
    //common.addAssetsToScreen(scene, ambientLight);
    common.addAssetsToScreen(group, mesh);
    common.addAssetsToScreen(group, cloudMesh)
    groupParent.add(group)
    common.addAssetsToScreen(scene, groupParent);






    let moonMaterial = common.createMaterial('phong', {
            color: 0xffffff
        }),
        moonMesh = common.createMesh(common.createGeometry('sphere', [constUnit*0.3, 32, 32]), moonMaterial);
    common.rotate(moonMesh, {
        x: DEG_90
    })
    common.textureLoader('../images/moon.jpg', moonMap => {
        moonMaterial.map = moonMap;
        moonMaterial.needsUpdate = true;
    })


    let moonGroup = new THREE.Object3D();
        moonGroup.castShadow = true;
        moonGroup.receiveShadow = true;
    var lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        lineWidth: 4
    });

    var moonOrbit = new THREE.Geometry();
    for (let i = 0; i < 361; i++) {
        let x = Math.cos((i * Math.PI) / 180) * constUnit*3
        let z = Math.sin((i * Math.PI) / 180) * constUnit*3
        moonOrbit.vertices.push(new THREE.Vector3(x, 0, z))
    }

    var line = new THREE.Line(moonOrbit, lineMaterial);
    moonMesh.position.set(constUnit*3, 0, 0);
    group.add(line);
    // common.rotate(group,{
    //     z: -DEG_30
    // })
    common.addAssetsToScreen(moonGroup, moonMesh)
    common.addAssetsToScreen(group, moonGroup);


    var start;

    function run(timestamp) {
        if (animating) {
            common.rotate(mesh, {
                y: mesh.rotation.y + 5*speedUnit
            });
            common.rotate(cloudMesh, {
                y: cloudMesh.rotation.y + 1*speedUnit
            });
            common.rotate(moonGroup, {
                y: moonGroup.rotation.y + 5*speedUnit/28 //WHY if this is the moonmesh the it is rotation aroud its own axis and not revolution around the earth??
            });
            common.rotate(groupParent, {
                y: groupParent.rotation.y + 5*speedUnit/100 //WHY if this is the moonmesh the it is rotation aroud its own axis and not revolution around the earth??
            });
            if (!start) {
                start = timestamp;
            }
            // if(timestamp-start>50){
            //     start = timestamp
            //     common.rotate(sunMesh,{
            //         y: sunMesh.rotation.y + 0.5
            //     })
            // }

            common.render(renderer, scene, camera);
        }

        window.requestAnimationFrame(run)

    }








    var starsGeometry = new THREE.Geometry();

    for (var i = 0; i < 10000; i++) {

        var star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread(2000);
        star.y = THREE.Math.randFloatSpread(2000);
        star.z = THREE.Math.randFloatSpread(2000);

        starsGeometry.vertices.push(star);

    }

    var starsMaterial = new THREE.PointsMaterial({
        color: 0x888888
    })

    var starField = new THREE.Points(starsGeometry, starsMaterial);

    scene.add(starField);








    group.position.set(constUnit*12, 0, 0)


    let sunGroup = new THREE.Object3D,
        sunMaterial = new THREE.MeshPhongMaterial({
            color: 0xffff00,
            emissive: 0xffffff,
            emissiveMap: loader.load('../images/sun.jpg')
        }),
        sunMesh = new THREE.Mesh(new THREE.SphereGeometry(constUnit*3, 32, 32), sunMaterial),
        sunLight = new THREE.PointLight(0xffffff, 1.2, 100000);
    // common.textureLoader('../images/sun.jpg',sunTexture=>{
    //     sunMaterial.map = sunTexture;
    //     sunMaterial.needsUpdate = true;
    // })
    sunGroup.add(sunMesh)
    sunGroup.add(sunLight);
    scene.add(sunGroup);



    var earthOrbit = new THREE.Geometry()
    for (let i = 0; i < 361; i++) {
        let x = Math.cos((i * Math.PI) / 180) * constUnit*12
        let z = Math.sin((i * Math.PI) / 180) * constUnit*12
        earthOrbit.vertices.push(new THREE.Vector3(x, 0, z))
    }

    var lineOrbit = new THREE.Line(earthOrbit, lineMaterial);
    scene.add(lineOrbit);


    run();
    common.render(renderer, scene, camera);
}


function createCube() {
    renderer = common.createRenderer({
        container: "container"
    });
    renderer.shadowMap.enabled = true
    scene = common.createScene();
    createEarth(scene, renderer);
    addMouseHandler()
}

function addMouseHandler() {
    var dom = renderer.domElement;

    dom.addEventListener('mouseup', event => {
        animating = !animating
    }, false);
}

var renderer, scene;
createCube()
