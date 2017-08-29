const fs = require('fs-extra')
const path = require('path')

const clientDir = path.join(__dirname, 'build') // create-react-app - build, angular-cli - dist, ember-cli - ?
const serverDir = path.join(__dirname, 'server')
const deployDir = path.join(__dirname, 'deploy')
const indexFileName = path.join(clientDir, 'index.html')
const separator = '\n\t' //Empty to minify or \n\t for carriage return and tab

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
  if (error) {
    console.log('Could not find ' + indexFileName + '. Have you run the CLI build first?')
    return callback(error)
  }
  fileContents = fileContents.replace('<head>', '<head>' + separator + metaTags + separator)
  fs.writeFile(indexFileName, fileContents, 'utf8')
})
