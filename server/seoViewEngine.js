const fs = require('fs')
const seoData = require('./seoData.js')

function getSeoFromFile (url) {
  return seoData.paths[url]
    ? { ...seoData.paths.default, ...seoData.paths[url] }
    : seoData.paths.default
}

function seoViewEngine (filePath, options, callback) {
  fs.readFile(filePath, 'utf8', function (error, fileContents) {
    if (error) return callback(error)
    const seo = getSeoFromFile(options.url)
    for (const prop in seo) {
      if (prop === 'title') {
        fileContents = fileContents.replace('__' + prop + '__', seoData.titlePrefix + seo[prop])
      } else {
        fileContents = fileContents.replace('__' + prop + '__', seo[prop])
      }
    }
    callback(null, fileContents)
  })
}

module.exports = seoViewEngine
