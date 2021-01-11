const runBuild = require('./run-build')
let buildLibConfig = require('../build.config').buildLib

buildLibConfig = Object.assign({ isLib: true }, buildLibConfig)
runBuild(buildLibConfig)
