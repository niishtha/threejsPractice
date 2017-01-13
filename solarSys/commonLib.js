var common = {};

common.createRenderer = function(params) {
    if (!params.container) {
        console.error('provide container');
        return
    }
    let containerElement = document.getElementById(params.container),
        canvas = params.canvas,
        renderer = new THREE.WebGLRenderer({
            canvas
        });
    if (!canvas) {
    	containerElement.appendChild(renderer.domElement)
        renderer.setSize(containerElement.offsetWidth, containerElement.offsetHeight);
        
    }
    return renderer;
}

common.createScene = function(argument) {
    let scene = new THREE.Scene()
    return scene;
}

common.createCamera = function(position, params = {}) {
    let camera = new THREE.PerspectiveCamera(params.fov || 45, params.aspectRatio || 1, params.frontPlane || 0.1, params.backPlace || 4000);
    camera.position.set(...position);
    return camera;
}

common.createMesh = function(geometry, material) {
    let mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

common.createGeometry = function(type, dimentionArray) {
    let map = {
            cube: 'CubeGeometry',
            plane: 'PlaceGeometry'
        },
        geometry = new THREE[map[type]](...dimentionArray);
    return geometry;
}

common.createMaterial = function(type, params) {
    let map = {
            basic: 'MeshBasicMaterial',
            phong: 'MeshPhongMaterial'
        },
        material = new THREE[map[type]](params);
    return material;
}

common.createLight = function(position=[], color, intensity) {
	let light = new THREE.DirectionalLight(color, intensity)
	light.position.set(...position);
	return light;
}

common.addAssetsToScreen = function(scene, obj) {
    scene.add(obj);
}

common.render = function (render, scene, camera) {
	render.render(scene, camera);
}

common.textureLoader = function (imagePath, callbackSuccess) {
	let loader = new THREE.TextureLoader();
	loader.load(imagePath, callbackSuccess, (xhr)=>{
		console.log(`${xhr.loaded/xhr.total*100}% loaded`);
	}, xhr=>{
		console.err('error on load')
		console.log(xhr.error)
	});
}

common.rotate = function(mesh, rotObj) {
	for(axis in rotObj){
		if(rotObj.hasOwnProperty(axis) && rotObj[axis]){
			mesh.rotation[axis] = rotObj[axis];	
		}
	}
	
}
