import { Config } from "jest";
import nextJest from "next/jest.js";
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/testing/setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  fakeTimers: {
    enableGlobally: true,
  },
  clearMocks: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
