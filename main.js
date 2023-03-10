import './style.css'

import * as THREE from 'three';

///import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Setup
//Need scene(container), camera, renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//second and third argument is aspect ratio

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera ); //draw


//Lights
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

//Helpers
//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200,50);
//scene.add(lightHelper, gridHelper)
//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.CapsuleGeometry(0.25, 0.5, 10, 20);
  const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff })
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)

  star.rotation.x = x;
  star.rotation.y = y;
  star.rotation.z = z;
}

Array(200).fill().forEach(addStar)


//background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;








//const torusTexture = new THREE.TextureLoader().load('name.png');
//const material = new THREE.MeshBasicMaterial({ map: torusTexture })
//const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
//donut
const torusTexture = new THREE.TextureLoader().load('donut.png');
const material = new THREE.MeshBasicMaterial({ map: torusTexture })
const geometry = new THREE.TorusGeometry( 10, 4, 16, 70 )
const torus = new THREE.Mesh( geometry, material );
scene.add(torus);


//scroll animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.001;
  camera.position.y = t * -0.001;

  torus.rotation.x += 0.02;
  torus.rotation.y += 0.05;
  torus.rotation.z += 0.02;
}
document.body.onscroll = moveCamera;
moveCamera();




//animation loop
function animate() {
  requestAnimationFrame(animate);

  //torus.rotation.x += 0.01;
  //torus.rotation.y += 0.01;
  //torus.rotation.z += 0.01;

  //controls.update();

  renderer.render( scene, camera );
}

animate();

//npm run dev to run it