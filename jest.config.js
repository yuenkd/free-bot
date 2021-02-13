module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverageFrom: ['**/src/**/*.ts', '!src/test/**/*.ts'],
    coverageThreshold: {
        global: {
            statements: 75,
            branches: 90,
            functions: 80,
            lines: 75,
        },
    },
}
