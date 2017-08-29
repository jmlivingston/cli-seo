const fs = require('fs')
const seoData = require('./seoData.js')

function getSeoFromFile (url) {
  return seoData.paths[url]
    ? {
      title: seoData.titlePrefix + (seoData.paths[url].title || seoData.paths.default.title),
      meta: { ...seoData.paths.default.meta, ...seoData.paths[url].meta }
    }
    : {
      title: seoData.titlePrefix + seoData.paths.default.title,
      meta: { ...seoData.paths.default.meta }
    }
}

function seoViewEngine (filePath, options, callback) {
  fs.readFile(filePath, 'utf8', function (error, fileContents) {
    if (error) return callback(error)
    // Note: You should use a database or routing class instead
    const seo = getSeoFromFile(options.url)
    const separator = '\n\t' // optional
    let metaTags = Object.entries(seo.meta).map(([key, value]) => {
      return `<meta ${value.type}="${key}" content="${value.value}">`
    })
    metaTags.unshift(`<title>${seo.title}</title>`)
    const metaTagsFormatted = separator + metaTags.join(separator) + separator
    fileContents = fileContents.replace('<head>', '<head>' + metaTagsFormatted)
    callback(null, fileContents)
  })
}

module.exports = seoViewEngine
