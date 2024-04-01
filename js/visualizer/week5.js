// Importing OrbitControls (make sure the path matches the version you are using)
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://threejs.org/examples/jsm/loaders/OBJLoader.js';

let camera, scene, renderer;
let object;
init();

function init() {

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20);
	camera.position.z = 2.5;

	// scene
	scene = new THREE.Scene();

	const ambientLight = new THREE.AmbientLight(0xcccccc, 3.2);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
	directionalLight.position.set(1, 1, 0).normalize();
	scene.add(directionalLight);

	const envMaploader = new THREE.CubeTextureLoader();
	const environmentMap = envMaploader.load([
		'../../js/visualizer/textures/bridge/posx.jpg', '../../js/visualizer/textures/bridge/negx.jpg',
		'../../js/visualizer/textures/bridge/posy.jpg', '../../js/visualizer/textures/bridge/negy.jpg',
		'../../js/visualizer/textures/bridge/posz.jpg', '../../js/visualizer/textures/bridge/negz.jpg'
	]);
	scene.environment = environmentMap;
	scene.background = environmentMap;

	const textureMap = new THREE.TextureLoader().load('../../js/visualizer/textures/uv_grid_opengl.jpg');
	const textureMaterial = new THREE.MeshStandardMaterial({ map: textureMap });

	const bunnyTexture = new THREE.TextureLoader().load('../../js/visualizer/textures/bunTexture.png');
	const bunnyMaterial = new THREE.MeshStandardMaterial({ map: bunnyTexture });

	// Create a metallic material with a gold tint
	const metalMaterial = new THREE.MeshStandardMaterial({
		color: 0xFFD700, // Gold color
		metalness: 0.9, // Fully metallic
		roughness: 0.1 // A bit of roughness to simulate gold's reflectivity
	});

	const matteMaterial = new THREE.MeshStandardMaterial({
		color: 0xFFD700, // Gold color
		metalness: 0.0,
		roughness: 0.9
	});

	const glassmaterial = new THREE.MeshPhysicalMaterial({
		color: 0xffffff, // Adjust the color as needed
		metalness: 0, // Glass is not metallic
		roughness: 0, // Smooth surface
		transmission: 1, // 0 is fully opaque, 1 is fully transparent (glass-like)
		transparent: true, // Enable transparency
		reflectivity: 1, // Adjust for the level of reflectivity
		refractionRatio: 0.9, // Adjust for the level of refraction
	});

	const loader = new OBJLoader();
	// model
	function onProgress(xhr) {
		if (xhr.lengthComputable) {
			const percentComplete = xhr.loaded / xhr.total * 100;
			//console.log('model ' + percentComplete.toFixed(2) + '% downloaded');
		}
	}
	function onError() { }

	loader.load('../../js/visualizer/textures/torus.obj', function (object) {

		// attach material
		object.traverse(function (child) {
			if (child.isMesh) {
				child.material = bunnyMaterial; // Apply the material to each mesh
			}
		});

	

		// Calculate the bounding box to get model size and center
		const boundingBox = new THREE.Box3().setFromObject(object);
		// Center the model
		const center = boundingBox.getCenter(new THREE.Vector3());
		// Scale the model to a unit scale and center it to (0,0,0)
		const size = boundingBox.getSize(new THREE.Vector3());
		const maxDimension = Math.max(size.x, size.y, size.z);
		const scale = 1.0 / maxDimension;
		object.scale.set(scale, scale, scale);
		object.position.set(-center.x * scale, -center.y * scale, -center.z * scale)

		// Add the model to the scene
		scene.add(object);
		render();
	}, onProgress, onError);

	const loader2 = new OBJLoader();
	loader2.load('../../js/visualizer/textures/humanPrototype.obj', function (object) {
		object.traverse(function (child) {
			if (child.isMesh) {
				child.material=textureMaterial;
			}
		});

		object.scale.set(0.5, 0.5, 0.5);
		object.position.set(1, 1, 0)

		scene.add(object);
		render();
	}, onProgress, onError)

	const loader3 = new OBJLoader();
	loader2.load('../../js/visualizer/textures/monkeyBus.obj', function (object) {
		object.traverse(function (child) {
			if (child.isMesh) {
				child.material=metalMaterial;
			}
		});

		object.scale.set(0.7, 0.7, 0.7);
		object.position.set(-1.9, 1, 1.2)

		scene.add(object);
		render();
	}, onProgress, onError)

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.addEventListener('change', render);
	window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
	renderer.render(scene, camera);
}