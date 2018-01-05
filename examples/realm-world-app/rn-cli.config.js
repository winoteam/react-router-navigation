/* @noflow */

const path = require('path')
const fs = require('fs')
const blacklist = require('metro-bundler/src/blacklist')

const packagesPath = path.resolve(__dirname, '../../packages')

module.exports = {
  extraNodeModules: {
    'react-native': path.resolve(__dirname, 'node_modules/react-native'),
  },
  getBlacklistRE: () => {
    return blacklist(
      fs
        .readdirSync(packagesPath)
        .filter(packageName => {
          return fs
            .lstatSync(path.join(packagesPath, packageName))
            .isDirectory()
        })
        .map(projectRoot => {
          return new RegExp(`${projectRoot}\/node_modules\/react-native\/.*`)
        }),
    )
  },
}
