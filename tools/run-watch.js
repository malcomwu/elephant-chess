const fs = require('fs')
const path = require('path')
const runBuild = require('./run-build')

var debounce = (func, wait) => {
  let timeout
  return function () {
    const debounced = () => {
      timeout = null
      func.apply(this, arguments)
    }
    clearTimeout(timeout)
    timeout = setTimeout(debounced, wait)
  }
}

const watchDir = '../src'
const absWatchDir = path.resolve(__dirname, watchDir)

module.exports = (config, cb) => {
  const build = () => {
    if (cb) {
      cb(runBuild(config, false))
    } else {
      runBuild(config)
    }
    console.log('Watching directory:', watchDir)
  }

  build()

  fs.watch(absWatchDir, { recursive: true }, debounce((eventType, filename) => {
    if (filename) {
      console.log(eventType, filename)
      build()
    }
  }, 300))
}
