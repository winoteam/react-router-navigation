const path = require('path')
const metroBundler = require('metro')

module.exports = {
  extraNodeModules: {
    'react-native': path.resolve(__dirname, 'node_modules/react-native'),
  },
  getBlacklistRE: function() {
    return metroBundler.createBlacklist([
      /react-router-navigation\/node_modules\/react-native\/.*/,
      /react-router-navigation-core\/node_modules\/react-native\/.*/,
    ])
  },
}
