import dotenv from 'dotenv';
dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: 3001,
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '.+\\.(css|scss)$': 'jest-css-modules-transform',
  },
  moduleNameMapper: {
    '.+\\.(png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
  },
};
