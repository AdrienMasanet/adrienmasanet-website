import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class PortraitLogic {
  private containerRef: React.RefObject<HTMLDivElement>;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private raycaster: THREE.Raycaster;
  private portraitMesh: THREE.Mesh | undefined = undefined;
  private mouse: THREE.Vector2;
  private loader: GLTFLoader;
  private active: boolean = false;
  private animationLoopLerp: number = 2.5;
  private time: number = 0;

  constructor(containerRef: React.RefObject<HTMLDivElement>) {
    // Append the ThreeJs canvas to the React component's container ref
    this.containerRef = containerRef;

    // Sets the width and height to the size of the container
    const width = this.containerRef.current?.clientWidth || 0;
    const height = this.containerRef.current?.clientHeight || 0;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(20, width / height, 0.1, 1000);

    // Initialize the ThreeJs renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.setSize(width, height);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.containerRef.current?.appendChild(this.renderer.domElement);

    // Setup a raycaster to detect mouse
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Add a mouse move listener to the ThreeJs canvas to detect mouse position
    const mouseMoveListener = window.addEventListener("mousemove", (event) => {
      this.onMouseMove(event);
    });

    // Move the camera back to see the graph
    this.camera.position.z = 5;

    // Add lights to the scene
    this.makeLights();

    // Load the portrait texture
    this.loader = new GLTFLoader();
    this.loader
      .loadAsync("/3d/adrienmasanet_model.glb", (gltf) => {})
      .then((gltf) => {
        this.portraitMesh = gltf.scene.children[0] as THREE.Mesh;
        this.scene.add(this.portraitMesh);
        this.portraitMesh.position.y = -2;
        this.portraitMesh.rotation.z = Math.PI / 2;

        // Activate the animation if not already active
        this.active = true;

        // Start the animation
        this.update();
      });
  }

  makeLights() {
    // Create a professional lighting to make the graph look really nice
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
    directionalLight.position.set(0, 0, 1);
    this.scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.25);
    pointLight.position.set(0, 0, 1);
    this.scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 0, 1);
    spotLight.angle = Math.PI / 3;
    this.scene.add(spotLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.25);
    this.scene.add(hemisphereLight);

    const rectAreaLight = new THREE.RectAreaLight(0xffffff, 0.5, 1, 1);
    rectAreaLight.position.set(0, 0, 1);
    this.scene.add(rectAreaLight);
  }

  destroy() {
    this.containerRef.current?.removeChild(this.renderer.domElement);

    // Get rid of the mouse move listener
    window.removeEventListener("mousemove", this.onMouseMove);

    // Remove all HTML children from the container ref to avoid duplicate elements
    while (this.containerRef.current?.firstChild) {
      this.containerRef.current.removeChild(this.containerRef.current.firstChild);
    }
  }

  update() {
    if (!this.active || !this.portraitMesh) {
      return;
    }

    this.camera.updateMatrixWorld();
    this.raycaster.setFromCamera(this.mouse, this.camera);

    this.animateOpening();
    this.animateMouseSwing();
    this.animateLoopLerp(3.9, 1.75, 25);

    this.renderer.render(this.scene, this.camera);

    this.time += 1 / 60;

    requestAnimationFrame(this.update.bind(this));
  }

  animateOpening() {
    if (!this.portraitMesh) {
      return;
    }

    this.camera.position.z = this.animationLoopLerp;
    this.portraitMesh.position.y = -0.75 + this.animationLoopLerp / 12;
    this.portraitMesh.rotation.z = THREE.MathUtils.lerp(this.portraitMesh.rotation.z, 11, 0.007);
  }

  animateMouseSwing() {
    if (!this.portraitMesh) {
      return;
    }

    // Slighly rotate the portrait depending on the mouse X and Y to enforce the 3D effect
    this.portraitMesh.rotation.z = THREE.MathUtils.lerp(this.portraitMesh.rotation.z, -this.mouse.x * 1.5 + 11, 0.01);
  }

  animateLoopLerp(min: number, max: number, speed: number) {
    // Use a sine wave to animate a value between min and max
    this.animationLoopLerp = THREE.MathUtils.lerp(min, max, (Math.sin((this.time / speed) * Math.PI) + 1) / 2);
  }

  onMouseMove(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  disable() {
    this.active = false;
  }

  enable() {
    this.active = true;
    this.update();
  }
}
