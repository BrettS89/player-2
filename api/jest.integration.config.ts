import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  displayName: {
    name: 'Integration Tests',
    color: 'blueBright'
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/*.integration.test.ts',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/test/integration-setup.ts',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
  ],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  },
};

export default config;
