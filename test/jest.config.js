module.exports = {
    roots: ['<rootDir>/../src'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    collectCoverageFrom: ['src/**/*.ts'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/../src/$1',
    },
};