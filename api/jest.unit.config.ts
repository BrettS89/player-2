import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  displayName: {
    name: 'Unit Tests',
    color: 'greenBright'
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/**/*.test.ts',
  ],
  testPathIgnorePatterns: [
    'integration',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/test/unit-setup.ts',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
  ],
};

export default config;
