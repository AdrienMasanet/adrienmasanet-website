export type CircleChartElement = {
  name: string;
  percentage: number;
  color: string;
  description?: string;
};

export type CircleChartElementObject = {
  data: CircleChartElement;
  mesh: THREE.Mesh;
};
