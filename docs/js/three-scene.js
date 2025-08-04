import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//Preparación do contedor
const contedor = document.getElementById('threejs-container');

//Escena, cámara e renderer
const escena = new THREE.Scene();
escena.background = new THREE.Color(0xf5dcc5);

const camara = new THREE.PerspectiveCamera(
  75,
  contedor.clientWidth / contedor.clientHeight,
  0.1,
  1000
);
camara.position.z = 8;

const renderizador = new THREE.WebGLRenderer({ antialias: true });
renderizador.setSize(contedor.clientWidth, contedor.clientHeight);
contedor.appendChild(renderizador.domElement);

const controls = new OrbitControls(camara, renderizador.domElement);
controls.enableDamping = true; // hace que el movimiento sea más suave
controls.dampingFactor = 0.05;
controls.enableZoom = true;

//Luz
const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5);
escena.add(luzAmbiente);

const luzDireccional = new THREE.DirectionalLight(0xffffff, 0.9);
luzDireccional.position.set(1, 1, 1);
escena.add(luzDireccional);

//Textura do cilindro
const cargadorTextura = new THREE.TextureLoader();
const textura = cargadorTextura.load('/images/texturaThree.jpg');

textura.wrapS = THREE.RepeatWrapping;
textura.wrapT = THREE.RepeatWrapping;
textura.repeat.set(2, 1);

// Crear o cilindro
const xeometriaCilindro = new THREE.CylinderGeometry(1, 1, 5, 32);
const materialCilindro = new THREE.MeshStandardMaterial({ map: textura });
const cilindro = new THREE.Mesh(xeometriaCilindro, materialCilindro);
escena.add(cilindro);

//Crear tapas
const xeometriaTapa = new THREE.SphereGeometry(1.05, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
const materialTapa = new THREE.MeshStandardMaterial({ color: 'silver' });

const tapaSuperior = new THREE.Mesh(xeometriaTapa, materialTapa);
tapaSuperior.position.y = 2.45;
escena.add(tapaSuperior);

const tapaInferior = new THREE.Mesh(xeometriaTapa, materialTapa);
tapaInferior.rotation.x = Math.PI;
tapaInferior.position.y = -2.45;
escena.add(tapaInferior);

//Animación
function animar() {
  requestAnimationFrame(animar);
  cilindro.rotation.y += 0.02;
  controls.update();
  renderizador.render(escena, camara);
}
animar();

// Redimensionamento dinámico
window.addEventListener('resize', () => {
  const ancho = contedor.clientWidth;
  const alto = contedor.clientHeight;
  camara.aspect = ancho / alto;
  camara.updateProjectionMatrix();
  renderizador.setSize(ancho, alto);
});
