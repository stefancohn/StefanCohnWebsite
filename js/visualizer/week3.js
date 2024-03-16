// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const nWidth = width / Math.max(width, height) * 10;
const nHeight = height / Math.max(width, height) * 10;
//const camera = new THREE.OrthographicCamera(-nWidth / 2, nWidth / 2, nHeight / 2, -nHeight /2, 0.1, 1000);
scene.add(camera);

camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
//const geometry = new THREE.BoxGeometry()
const geometry = new THREE.TorusGeometry(1.5, 0.2, 5, 6)
const geometry1 = new THREE.BoxGeometry(1.5, 1.3, 2);
const geometry2  = new THREE.SphereGeometry(1.3, 40,40);

const material1 = new THREE.MeshBasicMaterial({ color: 0x0000FF });
const material = new THREE.MeshBasicMaterial({ color: 0xFF69B4 });
const material2 = new THREE.MeshBasicMaterial({ color: 0xEE9309})

const torus = new THREE.Mesh(geometry, material);
const cube = new THREE.Mesh(geometry1, material1);
const sphere = new THREE.Mesh(geometry2, material2);
scene.add(torus);
scene.add(cube);
scene.add(sphere);

// 2. Create edge geometry and material
const edgeGeometry = new THREE.EdgesGeometry(geometry);
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Edge color
const torusEdges = new THREE.LineSegments(edgeGeometry, edgeMaterial);

const edgeGeometry1 = new THREE.EdgesGeometry(geometry1);
const edgeMateiral1 = new THREE.LineBasicMaterial({ color: 0xC7882B });
const cubeEdges = new THREE.LineSegments(edgeGeometry1, edgeMateiral1);

const edgeGeometry2 = new THREE.EdgesGeometry(geometry2);
const edgeMateiral2 = new THREE.LineBasicMaterial({ color : 0x000000});
const sphereEdges = new THREE.LineSegments(edgeGeometry2, edgeMateiral2);
sphereEdges.material.linewidth= 100;

scene.add(torusEdges, cubeEdges, sphereEdges);

// use group
const group = new THREE.Group();   
scene.add(group);

group.add(torus)
group.add(torusEdges)
group.add(cube);
group.add(cubeEdges);
group.add(sphere, sphereEdges);
group.scale.set(2, 2, 2)

cube.position.set(.3, .2, .1)
cubeEdges.position.set(.3, .2, .1)
cube.scale.set(1, 1, 0.3);
cubeEdges.scale.set(1, 1, 0.3);

torus.position.set(0, 0, 0.5)
torusEdges.position.set(0, 0, 0.5)

sphere.position.set(-1, 0, -2)
sphereEdges.position.set(-1, 0, -2)
sphereEdges.scale.set(1.1,1.1,1.1);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    /*cube.rotation.x = 0.45;
    cube.rotation.y = 0.45;
    cubeEdges.rotation.x = 0.45;
    cubeEdges.rotation.y = 0.45;*/

    // use group
    group.rotation.x += 0.01;
    group.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();