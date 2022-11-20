module.exports = {
  verbose: true,
  testEnvironment: 'jest-environment-jsdom-fourteen',
  roots: [
    '<rootDir>/packages/vueland',
  ],
  moduleFileExtensions: [
    'vue',
    'ts',
    'js',
  ],
  moduleDirectories: [
    'node_modules',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
  },

  transform: {
    '.*\\.(j|t)s$': 'ts-jest',
    '.*\\.ts$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!**/*.d.ts',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  snapshotSerializers: [
    'jest-serializer-html',
  ],
  testMatch: [
    // Default
    '**/__tests__/**/*.spec.ts',
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
      // tsConfig: '<rootDir>/tsconfig.test.json',
      diagnostics: false,
    },
  },
}
