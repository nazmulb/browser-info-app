const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

module.exports = {
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    rootDir: ".",
    testEnvironment: "node",
    testRegex: ".e2e-spec.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    setupFilesAfterEnv: ['./setup-tests.ts'],
    reporters: [
        "default", [
            "../node_modules/jest-html-reporter",
            {
                pageTitle: "Test Report",
                outputPath: "./reports/index.html",
                includeFailureMsg: true
            }
        ]
    ]
};
