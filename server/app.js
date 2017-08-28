const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')

const seoViewEngine = require('./seoViewEngine.js')

const clientDir = path.join(__dirname, '..', 'client')
const port = process.env.PORT || '3000'

const app = express()
app.engine('html', seoViewEngine)
app.set('views', clientDir)
app.set('view engine', 'html')
app.use(favicon(path.join(clientDir, 'favicon.ico')));
// TODO? app.use(express.static(path.join(clientDir, 'static'))) // Depends on cli?

app.get('/*', (req, res, next) => {
  res.render('index', { url: req.url })
})

app.listen(port, function () {
  console.log('Listening on port ' + port)
})
