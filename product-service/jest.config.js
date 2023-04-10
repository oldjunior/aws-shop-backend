module.exports = {
    preset: 'ts-jest',
    moduleNameMapper: {
        "@functions": '<rootDir>/src/functions/index',
        "@functions/(.*)$": '<rootDir>/src/functions/$1',
        "@services/(.*)$": '<rootDir>/src/shared/services/$1',
        "@mocks/(.*)$": '<rootDir>/src/mocks/$1',
        "@types": '<rootDir>/src/types/index',
    },
};
