import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
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
    testPathIgnorePatterns: ['node_modules', 'dist'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }]
    }
}

export default config
