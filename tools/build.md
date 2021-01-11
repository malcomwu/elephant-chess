# Quick and dirty build

## Procedures

1. Convert a subset of es6 module statements to the node common-js module

```js
import a from './a'         => const a = require('./a')
import modA from 'modA'     => const modA = require('modA')
import { b, c } from './a'  => const { b, c } = require('./a')

export default class a {}   => const a = module.exports = class a {}
export default function a   => const a = module.exports = function a
export default a            => module.exports = a
export default a =          => const a = module.exports.a =
```

2. Processing data structure

```js
const files = {
  fid001: {
    path,
    src,
    target: convert2commonjs(src)
  },
  ...
}
```

3. Production: Wrap each module file + bundle

```js
/* By Quick-and-dirty ES6 module bundler */
///<front-matter>
(function () {
  'use strict'
  const files = {}

  const require = fid => {
    const module = { exports: {} }
    if (!files[fid]) {
      modules[fid](module)
      files[fid] = { exports: module.exports }
    }
    return files[fid].exports
  }

  const modules = {
///</front-matter>

  const modules = {
    fid101(module) {
      const a = require(fid003)    // fid003 => './a'
      module.exports.b = a + 1
    },

    fid102(module) {
      const a = require(fid003)
      module.exports = a + 2
    },

    fid103(module) {
      module.exports = 0
    }

///<back-matter>
  }
  require('fid100')   // entry
}())
///</back-matter>
```
