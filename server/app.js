const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')

const seoViewEngine = require('./seoViewEngine.js')

const clientDir = path.join(__dirname, '..', 'client')
const serverDir = path.join(__dirname, '..', 'server')
const port = process.env.PORT || '3001'

const app = express()

const isStatic = req => {
  // Note: Adjust as necessary.
  return req.url.includes('.') && !req.url.includes('index.html')
}

app.engine('html', seoViewEngine)
app.set('views', path.join(clientDir))
app.set('view engine', 'html')
app.use(favicon(path.join(clientDir, 'favicon.ico')));

app.get('/*', (req, res, next) => {
  if (isStatic(req)) {
    res.sendfile(req.url, { root: clientDir })
  } else {
    res.render('index', { url: req.url })
  }
})

app.listen(port, function () {
  console.log('Listening on port ' + port)
})
