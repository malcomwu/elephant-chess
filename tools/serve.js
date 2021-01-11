const http = require('http')
const fs = require('fs')
const path = require('path')
const { livereloadmatter } = require('./build-helpers')
const runWatch = require('./run-watch')
const serveConfig = require('../build.config').serve

// Ref: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.txt': 'text/plain',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
}

const getFilePath = url => {
  const fname = url === '/' ? '/index.html' : url
  return path.resolve(serveConfig.distPath, fname.substr(1))
}

var indexJs
var livereload = 'no'
var hack_count = 0

runWatch(serveConfig, str => {
  indexJs = serveConfig.livereload ? livereloadmatter + str : str
  livereload = hack_count ? 'yes' : 'no'
  hack_count++  // do not reload for the first build
})

http.createServer((request, response) => {
  const { url } = request

  const filePath = getFilePath(url)
  const extname = path.extname(filePath).toLowerCase()
  const contentType = MIME_TYPES[extname] || 'application/octet-stream'

  if (url === '/livereload') {
    response.writeHead(200, { 'Content-Type': MIME_TYPES['.txt'] })
    response.end(livereload, 'utf-8')
    livereload = 'no'
    return
  }

  console.log('Request: ' + url)

  // Take index.js from the RAM.
  if (filePath === serveConfig.output) {
    response.writeHead(200, { 'Content-Type': contentType })
    response.end(indexJs, 'utf-8')
    return
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT') {
        fs.readFile('./404.html', function(error, content) {
          response.writeHead(404, { 'Content-Type': 'text/html' })
          response.end(content, 'utf-8')
        })
      }
      else {
        response.writeHead(500)
        response.end('Sorry, check with the site admin for error: ' +
                      error.code+' ..\n')
      }
    }
    else {
      response.writeHead(200, { 'Content-Type': contentType })
      response.end(content, 'utf-8')
    }
  })
}).listen(serveConfig.port)

console.log(`Server running at http://localhost:${serveConfig.port}/`)
