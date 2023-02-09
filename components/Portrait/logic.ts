import * as THREE from "three";

export class PortraitLogic {
  private containerRef: React.RefObject<HTMLDivElement>;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private raycaster: THREE.Raycaster;
  private portraitMesh: THREE.Mesh;
  private mouse: THREE.Vector2;
  private active: boolean;

  constructor(containerRef: React.RefObject<HTMLDivElement>) {
    // Sets the width and height to the size of the container
    const width = containerRef.current?.clientWidth || 0;
    const height = containerRef.current?.clientHeight || 0;

    this.active = true;
    // Append the ThreeJs canvas to the React component's container ref
    this.containerRef = containerRef;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(20, width / height, 0.1, 1000);

    // Initialize the ThreeJs renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.setSize(width, height);
    this.containerRef.current?.appendChild(this.renderer.domElement);

    // Setup a raycaster to detect mouse
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Add a mouse move listener to the ThreeJs canvas to detect mouse position
    const mouseMoveListener = window.addEventListener("mousemove", (event) => {
      this.onMouseMove(event);
    });

    // Create a cube to simulate a portrait
    this.portraitMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    this.scene.add(this.portraitMesh);
    this.portraitMesh.position.y = -1.5;
    this.portraitMesh.position.z = -2;
    this.portraitMesh.rotation.y = 4;

    this.makeLights();

    // Move the camera back to see the graph
    this.camera.position.z = 5;

    // Start the animation
    this.update();
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
    if (!this.active) {
      return;
    }

    this.camera.updateMatrixWorld();
    this.raycaster.setFromCamera(this.mouse, this.camera);

    this.animateOpening();
    this.animateMouseSwing();

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.update.bind(this));
  }

  animateOpening() {
    this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, 4, 0.01);
    this.portraitMesh.position.y = THREE.MathUtils.lerp(this.portraitMesh.position.y, 0, 0.01);
    this.portraitMesh.rotation.x = THREE.MathUtils.lerp(this.portraitMesh.rotation.x, 0, 0.01);
    this.portraitMesh.rotation.y = THREE.MathUtils.lerp(this.portraitMesh.rotation.y, 0.25, 0.007);
  }

  animateMouseSwing() {
    // Slighly rotate the portrait depending on the mouse X and Y to enforce the 3D effect
    this.portraitMesh.rotation.x = THREE.MathUtils.lerp(this.portraitMesh.rotation.x, -this.mouse.y * 0.25, 0.01);
    this.portraitMesh.rotation.y = THREE.MathUtils.lerp(this.portraitMesh.rotation.y, this.mouse.x * 0.25, 0.01);
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
