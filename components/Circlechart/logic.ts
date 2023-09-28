import React from "react";
import * as THREE from "three";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

import { CircleChartElement, CircleChartElementObject } from "./types";

const extrudeSettings = {
  depth: 0.1,
  bevelEnabled: true,
  bevelSegments: 1,
  samples: 1,
  curveSegments: 30,
  bevelSize: 0.04,
  bevelThickness: 0.04,
};

export class CircleChartLogic {
  private containerRef: React.RefObject<HTMLDivElement>;
  private renderer: THREE.WebGLRenderer;
  private labelRenderer: CSS2DRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private raycaster: THREE.Raycaster;
  private graphMesh: THREE.Mesh;
  private elementsMeshes: CircleChartElementObject[] = [];
  private scale: number;
  private mouse: THREE.Vector2;
  private styles: any;
  private labelsDistance: number;
  private active: boolean;

  constructor(
    containerRef: React.RefObject<HTMLDivElement>,
    width: number,
    height: number,
    scale: number,
    elements: CircleChartElement[],
    gapBetweenElements: number,
    styles: { readonly [key: string]: string },
    labelsDistance: number,
    onLoadedCallback: () => void
  ) {
    this.active = true;
    // Append the ThreeJs canvas to the React component's container ref
    this.containerRef = containerRef;
    this.styles = styles;
    this.labelsDistance = labelsDistance;
    this.scale = scale;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(20, width / height, 0.1, 1000);

    // Initialize the ThreeJs renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.setSize(width, height);
    this.containerRef.current?.appendChild(this.renderer.domElement);

    // Initialize the ThreeJs CSS2DRenderer
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(width, height);
    this.labelRenderer.domElement.style.position = "absolute";
    this.labelRenderer.domElement.style.top = "0px";
    this.containerRef.current?.appendChild(this.labelRenderer.domElement);

    // Setup a raycaster to detect mouse
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Add a mouse move listener to the ThreeJs canvas to detect mouse position
    window.addEventListener("mousemove", (event) => {
      this.onMouseMove(event);
    });

    // Create a dummy mesh at the center of the scene to hold all the pieces that will shape the donut
    this.graphMesh = new THREE.Mesh();
    this.scene.add(this.graphMesh);
    this.graphMesh.rotation.z = 80;

    this.makeGraph(elements, gapBetweenElements);
    this.makeLights();

    // Move the camera back to see the graph
    this.camera.position.z = 9;

    // Call the callback to notify the parent component that the graph is ready
    onLoadedCallback();

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

  makeGraph(elements: CircleChartElement[], gapBetweenElements: number) {
    let totalAddedPercentage = 0;
    gapBetweenElements /= 10;

    // Create a ring for each element
    elements.forEach((element) => {
      const baseRingShape = new THREE.Shape();

      // Calculate the angle length of the current ring considering the element percentage
      const angleLength = (Math.PI * 2 * element.percentage) / 100;
      // Calculate the angle offset of the current ring considering the gap and the total added percentages of the previous elements
      const angleOffset = (Math.PI * 2 * totalAddedPercentage) / 100;

      baseRingShape.absarc(
        0,
        0,
        this.scale,
        angleOffset + gapBetweenElements * 1.5,
        angleLength + angleOffset - gapBetweenElements * 1.5,
        false
      );
      baseRingShape.absarc(
        0,
        0,
        this.scale * 1.5,
        angleLength + angleOffset - gapBetweenElements,
        angleOffset + gapBetweenElements,
        true
      );
      baseRingShape.closePath();

      const geometry = new THREE.ExtrudeGeometry(
        baseRingShape,
        extrudeSettings
      );
      geometry.computeVertexNormals();

      const material = new THREE.MeshPhongMaterial({
        color: element.color,
        wireframe: false,
        flatShading: false,
      });
      const mesh = new THREE.Mesh(geometry, material);

      this.graphMesh.add(mesh);

      const elementLabelDiv = document.createElement("div");
      elementLabelDiv.className = this.styles["label"];
      elementLabelDiv.innerText =
        element.name + "\n" + element.percentage + "%";
      const elementLabel = new CSS2DObject(elementLabelDiv);
      // Calculate the angle between the center of the canvas and the center of the element's ring 3d mesh
      const angle = angleOffset + angleLength / 2;
      elementLabel.position.set(
        Math.cos(angle) * this.labelsDistance * this.scale,
        Math.sin(angle) * this.labelsDistance * this.scale,
        0
      );
      mesh.add(elementLabel);

      // Create an object that will hold the element data and the mesh
      const elementObject: CircleChartElementObject = {
        data: element,
        mesh,
      };

      this.elementsMeshes.push(elementObject);

      // Add the current element percentage to the total added percentages
      totalAddedPercentage += element.percentage;
    });
  }

  destroy() {
    this.containerRef.current?.removeChild(this.renderer.domElement);

    // Get rid of the mouse move listener
    window.removeEventListener("mousemove", this.onMouseMove);

    // Remove all HTML children from the container ref to avoid duplicate elements
    while (this.containerRef.current?.firstChild) {
      this.containerRef.current.removeChild(
        this.containerRef.current.firstChild
      );
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
    this.labelRenderer.render(this.scene, this.camera);

    requestAnimationFrame(this.update.bind(this));
  }

  animateOpening() {
    this.camera.position.z = THREE.MathUtils.lerp(
      this.camera.position.z,
      11,
      0.003
    );
    this.graphMesh.rotation.x = THREE.MathUtils.lerp(
      this.graphMesh.rotation.x,
      -0.6,
      0.01
    );
    this.graphMesh.rotation.y = THREE.MathUtils.lerp(
      this.graphMesh.rotation.y,
      -0.2,
      0.007
    );

    this.graphMesh.rotation.z += 0.0002;
  }

  animateMouseSwing() {
    // Slighly rotate the graph mesh depending on the mouse X and Y to give the impression of a 3D object
    this.graphMesh.rotation.x = THREE.MathUtils.lerp(
      this.graphMesh.rotation.x,
      -this.mouse.y * 0.5,
      0.01
    );
    this.graphMesh.rotation.y = THREE.MathUtils.lerp(
      this.graphMesh.rotation.y,
      this.mouse.x * 0.5,
      0.01
    );
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
