// Importing OrbitControls (make sure the path matches the version you are using)
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

// Creating the scene
var scene = new THREE.Scene();

// Creating the camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Creating the renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add light.
const directionLight = new THREE.DirectionalLight(0xffffff, 0)
directionLight.position.set(0, 0, 10)
scene.add(directionLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // white light at 50% intensity
scene.add(ambientLight)

// load different color textures
const material = new THREE.MeshPhongMaterial()
const texture = new THREE.TextureLoader().load("earth_normalmap.jpg");
material.map = texture

const bumpTexture = new THREE.TextureLoader().load('earth_bumpmap.jpg')
material.bumpMap = bumpTexture
material.bumpScale = 0.015

texture.colorSpace = THREE.SRGBColorSpace;

const materialMap = new THREE.MeshStandardMaterial({ map: texture });

const sphereGeometry = new THREE.SphereGeometry(1.3, 40,40); // radius, widthSegments, heightSegments
const sphere = new THREE.Mesh(sphereGeometry, materialMap);
sphere.position.set(1.5, 1, 0)
scene.add(sphere);

// Adding OrbitControls
var controls = new OrbitControls(camera, renderer.domElement);

// Adjust control settings if needed
controls.minDistance = 1;
controls.maxDistance = 10;
controls.enablePan = true;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    // Rendering the scene
    renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);
animate();