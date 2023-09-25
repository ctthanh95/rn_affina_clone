module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components/index',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@images': './src/assets/images',
          '@svg': './src/assets/svg',
          '@navigation': './src/navigation',
          '@hooks': './src/hooks',
          '@slices': './src/redux/slices',
          '@sagas': './src/redux/sagas',
          '@api': './src/api',
        },
      },
    ],
  ],
};
