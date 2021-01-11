const path = require('path')

const common = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: path.resolve(__dirname, './dist/main.js'),
  libPath: path.resolve(__dirname, './lib'),
  load: {
    text: /\.md$/
  }
}

module.exports = {
  build: {
    ...common,
    minify: true
  },
  watch: {
    ...common,
    sourcemark: true
  },
  serve: {
    ...common,
    distPath: path.resolve(__dirname, './dist'),
    sourcemark: true,
    livereload: true,
    port: 8080
  }
}
