import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  transformIgnorePatterns: [
    'node_modules/(?!(mui-tel-input)/)'
  ]
}

const exportConfig = async () => ({
  ...(await createJestConfig(customJestConfig)())
});


export default exportConfig;