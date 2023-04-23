module.exports = {
    preset: 'ts-jest',
    moduleNameMapper: {
        "@functions": '<rootDir>/src/functions/index',
        "@functions/(.*)$": '<rootDir>/src/functions/$1',
        "@libs/(.*)$": '<rootDir>/src/libs/$1',
        "@services/(.*)$": '<rootDir>/src/shared/services/$1',
        "@types": '<rootDir>/src/types/index',
    },
};
