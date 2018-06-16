const getConfig = require('metro-bundler-config-yarn-workspaces')
const options = { nodeModules: require('path').resolve(__dirname, '..', '..') }

module.exports = getConfig(__dirname, options)
