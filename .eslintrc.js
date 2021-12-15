module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/no-unresolved',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          '@features': './src/features',
          '@components': './src/components',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@types': './src/types',
        },
      },
    },
  },
};
