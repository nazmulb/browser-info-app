const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

module.exports = {
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    testEnvironment: "node",
    testPathIgnorePatterns: [
        "/node_modules/",
        "/docs/",
        "/reports/",
        "/data/",
        "/dist/",
        "/logs/"
    ],
    testRegex: ".e2e-spec.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    setupFilesAfterEnv: ['./test/setup-tests.ts'],
    reporters: [
        "default", [
            "./node_modules/jest-html-reporter",
            {
                pageTitle: "Test Report",
                outputPath: "./reports/index.html",
                includeFailureMsg: true
            }
        ]
    ],
    coverageDirectory: "./reports/coverage",
    collectCoverageFrom: [
      "**/**.controller.ts",
      "**/**.service.ts",
      "!**/node_modules/**",
      "!**/vendor/**"
    ],
};
