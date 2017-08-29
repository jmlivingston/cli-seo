const fs = require('fs-extra')
const path = require('path')

const serverDir = path.join(__dirname, 'server')
const deployDir = path.join(__dirname, 'deploy')


// Note: Remove Promise if clientDir known
function setup () {
  return new Promise((resolve, reject) => {
    // Catch-all for create-react-app or angular-cli
    const buildDirs = ['build', 'dist']
    let clientDir = ''
    for (let buildDir of buildDirs) {
      if (fs.pathExistsSync(path.join(__dirname, buildDir))) {
        clientDir = path.join(__dirname, buildDir)
        resolve(clientDir)
        break
      }
    }
    if (!clientDir) {
      reject(new Error('Could not find build. Have you run the CLI build first?'))
    }
  })
}

setup().then(clientDir => {
  console.log(clientDir)
  const indexFileName = path.join(deployDir, 'client', 'index.html')
  // Empty string to minify or \n\t for carriage return and tab
  const separator = '\n\t'
  const metaValues = [
    { type: 'name', value: 'description' },
    { type: 'name', value: 'google-site-verification' },
    { type: 'name', value: 'keywords' },
    { type: 'name', value: 'msvalidate.01' },
    { type: 'name', value: 'twitter:description' },
    { type: 'name', value: 'twitter:image' },
    { type: 'name', value: 'twitter:title' },
    { type: 'name', value: 'twitter:url' },
    { type: 'property', value: 'article:author' },
    { type: 'property', value: 'article:publisher' },
    { type: 'property', value: 'fb:app_id' },
    { type: 'property', value: 'og:description' },
    { type: 'property', value: 'og:image' },
    { type: 'property', value: 'og:site_name' },
    { type: 'property', value: 'og:title' },
    { type: 'property', value: 'og:type' },
    { type: 'property', value: 'og:url' }
  ]

  const metaTags = [
    '<title>__title__</title>',
    ...metaValues.map(metaValue => {
      return `<meta ${metaValue.type}="${metaValue.value}" content="__${metaValue.value}__">`
    })
  ].join(separator)

  fs.emptyDirSync('./deploy')
  fs.copySync(clientDir, path.join(deployDir, 'client'))
  fs.copySync(serverDir, path.join(deployDir, 'server'))

  fs.readFile(indexFileName, 'utf8', function (error, fileContents) {
    if (error) callback(error)
    fileContents = fileContents.replace('<head>', '<head>' + separator + metaTags + separator)
    fs.writeFile(indexFileName, fileContents, 'utf8')
  })
}).catch(error => {
  console.log(error)
})
