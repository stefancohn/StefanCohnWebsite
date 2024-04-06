// Importing OrbitControls (make sure the path matches the version you are using)
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import { ShadowMapViewer } from 'https://threejs.org/examples/jsm/utils/ShadowMapViewer.js';
import { OBJLoader } from 'https://threejs.org/examples/jsm/loaders/OBJLoader.js';

let camera, scene, renderer;
let dirLight, spotLight;
let dirLightShadowMapViewer, spotLightShadowMapViewer;
let object;
init();

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 3;

    // scene
    scene = new THREE.Scene();

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
    scene.add(ambientLight);

    spotLight = new THREE.SpotLight(0xffffff, 500);
	spotLight.name = 'Spot Light';
	spotLight.angle = Math.PI / 5;
	spotLight.penumbra = 0.3;
	spotLight.position.set(10, 15, 5);
	spotLight.castShadow = true;
	spotLight.shadow.camera.near = 8;
	spotLight.shadow.camera.far = 30;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	scene.add(spotLight);

    dirLight = new THREE.DirectionalLight(0xffffff, 3);
	dirLight.name = 'Dir. Light';
	dirLight.position.set(0, 10, 0);
	dirLight.castShadow = true;
	dirLight.shadow.camera.near = 1;
	dirLight.shadow.camera.far = 10;
	dirLight.shadow.camera.right = 15;
	dirLight.shadow.camera.left = - 15;
	dirLight.shadow.camera.top = 15;
	dirLight.shadow.camera.bottom = - 15;
	dirLight.shadow.mapSize.width = 1024;
	dirLight.shadow.mapSize.height = 1024;
	scene.add(dirLight);

	scene.add(new THREE.CameraHelper(dirLight.shadow.camera));

	scene.add(new THREE.CameraHelper(spotLight.shadow.camera));

    // Materials
    const textureMap = new THREE.TextureLoader().load('../../js/visualizer/textures/uv_grid_opengl.jpg');
    const textureMaterial = new THREE.MeshStandardMaterial({ map: textureMap });

    const bunnyTexture = new THREE.TextureLoader().load('../../js/visualizer/textures/bunTexture.png');
    const bunnyMaterial = new THREE.MeshStandardMaterial({ map: bunnyTexture });

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFD700,
        metalness: 0.9,
        roughness: 0.1
    });

    let material = new THREE.MeshPhongMaterial({
		color: 0xff0000,
		shininess: 150,
		specular: 0x222222
	});

    const glassmaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        transmission: 1,
        transparent: true,
        reflectivity: 1,
        refractionRatio: 0.9,
    });

    // Loaders
    const loader = new OBJLoader();
    // model
	function onProgress(xhr) {
		if (xhr.lengthComputable) {
			const percentComplete = xhr.loaded / xhr.total * 100;
			//console.log('model ' + percentComplete.toFixed(2) + '% downloaded');
		}
	}
	function onError() { }

    loader.load('../../js/visualizer/textures/torus.obj', (object) => {
        object.traverse((child) => {
            if (child.isMesh) {
                child.material = bunnyMaterial;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const center = boundingBox.getCenter(new THREE.Vector3());
        const size = boundingBox.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = 1.0 / maxDimension;
        object.scale.set(scale, scale, scale);
        object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

        scene.add(object);
        render();
    }, onProgress, onError);

    const loader2 = new OBJLoader();
    loader2.load('../../js/visualizer/textures/humanPrototype.obj', (object) => {
        object.traverse((child) => {
            if (child.isMesh) {
                child.material = textureMaterial;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        object.scale.set(0.5, 0.5, 0.5);
        object.position.set(1, 1, 0);

        scene.add(object);
        render();
    }, onProgress, onError);

    const loader3 = new OBJLoader();
    loader3.load('../../js/visualizer/textures/monkeyBus.obj', (object) => {
        object.traverse((child) => {
            if (child.isMesh) {
                child.material = metalMaterial;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        object.scale.set(0.7, 0.7, 0.7);
        object.position.set(-1.9, 1, 1.2);

        scene.add(object);
        render();
    }, onProgress, onError);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Enable soft shadows

    const geometry = new THREE.BoxGeometry(10, 0.15, 10);
	material = new THREE.MeshPhongMaterial({
		color: 0xa0adaf,
		shininess: 150,
		specular: 0x111111
	});
    const ground = new THREE.Mesh(geometry, material);
	ground.scale.multiplyScalar(3);
	ground.castShadow = false;
	ground.receiveShadow = true;
    ground.position.set(0,-0.5,0);
	scene.add(ground);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    window.addEventListener('resize', onWindowResize);

    initShadowMapViewers();

    document.body.appendChild(renderer.domElement);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    renderer.render(scene, camera);
}

function initShadowMapViewers() {
	dirLightShadowMapViewer = new ShadowMapViewer(dirLight);
	spotLightShadowMapViewer = new ShadowMapViewer(spotLight);
	resizeShadowMapViewers();
}

function resizeShadowMapViewers() {
	const size = window.innerWidth * 0.15;

	dirLightShadowMapViewer.position.x = 10;
	dirLightShadowMapViewer.position.y = 10;
	dirLightShadowMapViewer.size.width = size;
	dirLightShadowMapViewer.size.height = size;
	dirLightShadowMapViewer.update();

	spotLightShadowMapViewer.size.set(size, size);
	spotLightShadowMapViewer.position.set(size + 20, 10);
	spotLightShadowMapViewer.update();
}