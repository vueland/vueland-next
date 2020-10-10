module.exports = {
  verbose: false,
  testEnvironment: 'jest-environment-jsdom-fourteen',
  roots: [
    '<rootDir>/src',
  ],
  moduleFileExtensions: [
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
    '\\.(styl)$': 'jest-css-modules',
    '\\.(sass|scss)$': 'jest-css-modules',
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
    '**/test/**/*.js',
    '**/__tests__/**/*.spec.js',
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
