const DEG_30 = Math.PI / 6,
    DEG_45 = Math.PI / 4,
    DEG_60 = Math.PI / 3,
    DEG_90 = Math.PI / 2;

function createEarth(scene, renderer) {
    let camera = common.createCamera([0, 6, 20]),
        light = common.createLight([9, 0, 9], undefined, 2),
        ambientLight = common.createAmbientLight(undefined, .7),
        //cubeGeometry = common.createGeometry('cube', [0.5, 0.5, 0.5]),
        cubeGeometry = common.createGeometry('sphere', [1, 32, 32]),
        material = common.createMaterial('phong', {
            color: 0xefefef
        }),
        mesh = common.createMesh(cubeGeometry, material),
        group = new THREE.Object3D();

    common.textureLoader('../images/earth_surface.jpg', earth_surface => {
        common.textureLoader('../images/earth_normal.jpg', earth_normal => {
            common.textureLoader('../images/earth_specular.jpg', earth_specular => {
                // let shader = THREE.ShaderLib.normal,
                //     uniforms = THREE.UniformsUtils.clone(shader.uniforms);
                // uniforms["normalMap"].texture = earth_normal;
                // uniforms["diffuse"].texture = earth_surface;
                // uniforms["specularMap"].texture = earth_specular;

                // uniforms["enableDiffuse"].value = true;
                // uniforms["enableSpecular"].value = true;


                // material = new THREE.ShaderMaterial({
                //     fragmentShader: shader.fragmentShader,
                //     vertexShader: shader.vertexShader,
                //     uniforms: uniforms,
                //     lights: true
                // })
                material.map = earth_surface;
                material.needsUpdate = true;
                common.render(renderer, scene, camera);
            })
        })
    });
    common.rotate(mesh, {
        x: DEG_30,
        y: -DEG_30
    })

    let cloudMaterial = common.createMaterial('lambert', {
            color: 0xaeaeff,
            //map: cloudsMap,
            transparent: true
        }),
        cloudMesh = common.createMesh(common.createGeometry('sphere', [1.4, 32, 32]), cloudMaterial);

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
    common.addAssetsToScreen(group, light);
    common.addAssetsToScreen(group, ambientLight);
    common.addAssetsToScreen(group, mesh);
    common.addAssetsToScreen(group, cloudMesh)
    common.addAssetsToScreen(scene, group);






    let moonMaterial = common.createMaterial('phong',{
            color: 0xffffff
        }),
        moonMesh = common.createMesh(common.createGeometry('sphere', [0.5, 32, 32]), moonMaterial);
    moonMesh.position.set(5, 0, 0);
    common.rotate(moonMesh,{
        x:DEG_90
    })
    common.textureLoader('../images/moon.jpg', moonMap=>{
        moonMaterial.map = moonMap;
        moonMaterial.needsUpdate = true;
    })


    let moonGroup = new THREE.Object3D();
    common.addAssetsToScreen(moonGroup, moonMesh)
    common.addAssetsToScreen(group, moonGroup);

    function run(timestamp) {
        common.rotate(mesh, {
            y: mesh.rotation.y + 0.005
        });
        common.rotate(cloudMesh, {
            y: cloudMesh.rotation.y + 0.003
        });
        common.rotate(moonGroup, {
            y: moonGroup.rotation.y + 0.005 //WHY if this is the moonmesh the it is rotation aroud its own axis and not revolution around the earth??
        });

        common.render(renderer, scene, camera);
        window.requestAnimationFrame(run)
    }








    var starsGeometry = new THREE.Geometry();

    for ( var i = 0; i < 10000; i ++ ) {

        var star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread( 2000 );
        star.y = THREE.Math.randFloatSpread( 2000 );
        star.z = THREE.Math.randFloatSpread( 2000 );

        starsGeometry.vertices.push( star );

    }

    var starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } )

    var starField = new THREE.Points( starsGeometry, starsMaterial );

    scene.add( starField );





    var lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        lineWidth: 4
    });

    var lineGeometry = new THREE.Geometry();
    for(let i=0; i<360;i++){
        let x = Math.cos((i*Math.PI)/180) * 5
        let z = Math.sin((i*Math.PI)/180) * 5
        lineGeometry.vertices.push(new THREE.Vector3(x, 0, z))    
    }

    var line = new THREE.Line( lineGeometry, lineMaterial );
    scene.add( line );






    run();
    common.render(renderer, scene, camera);
}


function createCube() {
    let renderer = common.createRenderer({
            container: "container"
        }),
        scene = common.createScene();
    createEarth(scene, renderer);
}


createCube()
