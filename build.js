const fs = require('fs-extra')
const path = require('path')

const serverDir = path.join(__dirname, 'server')
const deployDir = path.join(__dirname, 'deploy')

// START clientDir - Uncomment your pick and remove others
// 1. create-react-app: 
// const clientDir = path.join(__dirname, 'build')
// 2. angular-cli:
// const clientDir = path.join(__dirname, 'dist')
// 3. Agnostic function that will try to guess
const buildDirs = ['build', 'dist']
const clientDir = buildDirs.find(buildDir => {
  return fs.pathExistsSync(path.join(__dirname, buildDir))
    ? path.join(__dirname, buildDir)
    : ''
})
// END

if (!clientDir) {
  throw new Error('Can\'t find build folder. Did you run the CLI build first?')
}
fs.emptyDirSync('./deploy')
fs.copySync(clientDir, path.join(deployDir, 'client'))
fs.copySync(serverDir, path.join(deployDir, 'server'))
