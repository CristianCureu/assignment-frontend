export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "babel-jest",
    "^.+\\.svg$": "jest-transform-stub",
  },
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@src/types/(.*)$": "<rootDir>/src/types/$1",
    "^@schemas/(.*)$": "<rootDir>/src/schemas/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "jest-transform-stub",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transformIgnorePatterns: ["node_modules/(?!@babel/runtime)"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    'src/components/pages/**/*.{js,jsx,ts,tsx}', // Include only files in src/components/pages
    '!src/components/pages/**/*.d.ts',           // Exclude TypeScript definition files
  ],
};
