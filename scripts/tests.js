const child_process = require('child_process')
const fs = require('fs')
const path = require('path')
const rootPackageJson = require('./../package.json')

function isDirectory(source) {
  return fs.lstatSync(source).isDirectory()
}

function isJestDirectory(source) {
  const sourcePackageJson = require(path.join(source + '/package.json'))
  return sourcePackageJson.jest
}

const { packages } = rootPackageJson.workspaces

const jestDirectories = packages
  .map(packageDirectory => {
    const packageRootDirectory = packageDirectory.split('/')[0]
    return fs
      .readdirSync(packageRootDirectory)
      .map(name => path.join(__dirname + '/../' + packageRootDirectory, name))
      .filter(isDirectory)
      .filter(isJestDirectory)
  })
  .reduce((acc, directories) => [...acc, ...directories], [])

jestDirectories.forEach(cwd => {
  child_process.exec(
    'node_modules/.bin/jest',
    { cwd },
    (err, stdout, stderr) => {
      if (err) throw Error(err)
      console.log(stderr)
    },
  )
})
