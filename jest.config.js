module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "ts"],
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  transform: {
    "^.+\\.(t|j)s$": ["@swc/jest"],
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/(.*)-entity.ts",
    "<rootDir>/(.*)-dto.ts",
    "<rootDir>/(.*)-interface.ts",
    "<rootDir>/(.*)-errors?.ts",
    "<rootDir>/src/modules/(.*)$",
  ],
};
