const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      '@components': path.resolve(__dirname, 'v1/apps/mobile/src/components'),
      '@styles': path.resolve(__dirname, 'v1/apps/mobile/src/styles'),
    },
  },
const { getDefaultConfig } = require('expo/metro-config');
module.exports = getDefaultConfig(__dirname);
};
