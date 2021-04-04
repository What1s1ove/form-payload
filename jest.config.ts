import { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  modulePathIgnorePatterns: ['build'],
};

export default config;
