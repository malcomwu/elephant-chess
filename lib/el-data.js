const { push, pop, shift, unshift, splice, reverse } = []
const setToArray = set => Object.keys(set)
const unique = arr => setToArray(arrayToSet(arr))



class ElementAssign {
  constructor(obj, name) {
    this.obj = obj
    this.name = name
  }
  create(elName, attrName, content) {
    const element = el.create(elName, attrName, content)
    this.obj[this.name] = element
    return element
  }
}
el.assign = (obj, name) => new ElementAssign(obj, name)

class ElementPush {
  constructor(obj, name) {
    this.obj = obj
    this.name = name
  }
  create(elName, attrName, content) {
    const element = el.create(elName, attrName, content)
    this.obj[this.name] = this.obj[this.name] || []
    this.obj[this.name].push(element)
    return element
  }
}
el.push = (obj, name) => new ElementPush(obj, name)









let _key = 0
const makeKey = () => '' + _key++
const setKey = (element, key) => {
  if (isEl(element)) element = new Element(element).create()
  element.dataset.key = key
  return element
}
const getKey = element => {
  let key
  while (element) {
    key = element.dataset.key
    if (key) return key
    element = element.parentNode
  }
}

const configDeps = data => {
  const tmpData = {}, defaultData = {}
  const names = Object.keys(data)
  names.forEach(name => {
    const val = data[name]
    const _name = `_${name}`
    const { get, el } = val
    if (get || el) {
      Object.defineProperty(tmpData, name, {
        get() {
          return _name in this ? this[_name] :
                                (this[_name] = (get || el).apply(this))
        }
      })
    } else {
      tmpData[name] = val
    }
  })
  names.forEach(name => { defaultData[name] = tmpData[name] })

  const detector = { $collector: [] }
  names.forEach(name => {
    const _name = `_${name}`
    Object.defineProperty(detector, name, {
      get() {
        this.$collector.push(name)
        return _name in this ? this[_name] : defaultData[name]
      },
      set(val) { this[_name] = val }
    })
  })
  names.forEach(name => {
    let { get, el, dep } = data[name]
    if (get || el) (get || el).apply(detector)
    dep = unique(detector.$collector.concat(dep || []))
    detector.$collector.length = 0
    if (dep.length) data[name].dep = dep
  })
  return { data, defaultData }
}

class Data {
  constructor(data) {
    this.defaultData = configDeps(data).defaultData
    Object.assign(this, data)
    this.cacheElements = {}
    this.depGetters = {}
    this.makeConnectors()
    Object.keys(this.defaultData).forEach(name => {
      this[`_${name}`] = this.defaultData[name]
    })
  }

  set(name, func) {
    func(this[name])
    this[name] = this[name]
  }

  makeConnectors() {
    Object.keys(this).forEach(name => {
      if (name === 'cacheElements' || name === 'depGetters' || name === 'defaultData') return
      if (this.hasOwnProperty(name)) {
        this.cacheElements[name] = []
        this[`$${name}`] = this.makeConnector(name)
        this.makeAccessor(name)
      }
    })
  }

  makeConnector(name) {
    const { get } = this[name]
    if (Array.isArray(this.defaultData[name])) {
      return this.makeArrayConnector(name)
    }
    if (this[name].el) return this.makeElConnector(name)

    const that = this
    const funct = (element, type) => {
      const index = that.cacheElements[name].length
      that.cacheElements[name].push(element)
      if (type) {
        const tname = `_${name}_html`
        that [tname] = that[tname] || []
        that[tname][index] = true
      }
      that[name] = that[name]   // duplicate calls
    }
    funct.data = this
    funct.dname = name
    return funct
  }

  makeArrayConnector(name) {
    const that = this
    const funct = parent => {
      that.cacheElements[name].push({
        parent, children: [], map: parent.attrName ? '' : funct._map.shift()
      })
      that[name] = that[name]
    }
    funct.data = this
    funct.dname = name
    funct._map = []
    const defaultMap = a => el('pre', JSON.stringify(a))
    funct.map = map => { funct._map.push(map || defaultMap); return funct }
    return funct
  }

  makeElConnector(name) {
    const that = this
    return parent => {
      that.cacheElements[name].push({ parent, child: null })
      that[name] = that[name]   // duplicate calls
    }
  }

  makeAccessor(name) {
    const _name = `_${name}`
    const defaultVal = this[name]

    let { get, set, el, dep } = defaultVal

    if (dep) {
      dep.forEach(depName => {
        this.depGetters[depName] = this.depGetters[depName] || []
        this.depGetters[depName].push(name)
      })
    }

    // Getter property
    if (get && dep) {
      if (Array.isArray(this.defaultData[name])) {
        this.makeGetArrayAccessor(name, _name, get, set)
      } else {
        Object.defineProperty(this, name, {
          get() { return this[_name] },
          set(val) {
            this[_name] = get.apply(this)
            if (set && val !== undefined) set.call(this, val)
            this.runSetter(name, this[name])
          }
        })
      }

    // Element property
    } else if (el && dep) {
      Object.defineProperty(this, name, {
        get: el, set() { this.runElSetter(name) }
      })

    // Normal property
    } else {
      if (Array.isArray(defaultVal)) {
        this.makeArrayAccessor(name, _name)
      } else {
        Object.defineProperty(this, name, {
          get() { return this[_name] },
          set(value) {
            this[_name] = value
            this.runSetter(name, value)
          }
        })
      }
      this[name] = defaultVal
    }
  }

  alterArrayMethods(name, arr) {
    const cache = this.cacheElements[name]
    const getChildren = () => this.cacheElements[name]
    const that = this
    Object.assign(arr, {
      push() {
        const args = Array.from(arguments)
        args.forEach(arg => {
          const key = makeKey()
          this.keys.push(key)
          cache.forEach(elPair => {
            const cel = setKey(elPair.map(arg))
            elPair.children.push(cel)
            elPair.parent.appendChild(cel)
          })
        })
        const result = push.apply(this, args)
        that.setDepProp(name)
        return result
      },
      pop() {
        cache.forEach(elPair => {
          const last = elPair.children.pop()
          if (last) elPair.parent.removeChild(last)
        })
        this.keys.pop()
        const result = pop.apply(this)
        that.setDepProp(name)
        return result
      },
      shift() {
        cache.forEach(elPair => {
          const first = elPair.children.shift()
          if (first) elPair.parent.removeChild(first)
        })
        this.keys.shift()
        const result = shift.apply(this)
        that.setDepProp(name)
        return result
      },
      unshift() {
        const args = Array.from(arguments)
        args.slice().reverse().forEach(arg => {
          const key = makeKey()
          this.keys.unshift(key)
          cache.forEach(elPair => {
            const cel = setKey(elPair.map(arg), key)
            elPair.children.unshift(cel)
            elPair.parent.prepend(cel)
          })
        })
        const result = unshift.apply(this, args)
        that.setDepProp(name)
        return result
      },
      splice() {
        const args = Array.from(arguments)
        const result = splice.apply(this, args)
        that.runArraySetter(name, this)
        return result
      },
      reverse() {
        cache.forEach(elPair => {
          elPair.parent.textContent = ''
          elPair.children.reverse()
          elPair.children.forEach(element => {
            elPair.parent.appendChild(element)
          })
        })
        this.keys.reverse()
        const result = reverse.apply(this)
        that.setDepProp(name)
        return result
      },
      indexOfEl(element) {
        const key = getKey(element)
        return this.keys.indexOf(key)
      },
      itemOfEl(element) {
        const index = this.indexOfEl(element)
        return this[index]
      },
      removeAt(index) {
        if (index > -1) return this.splice(index, 1)
      },
      remove(item) {
        const index = this.findIndex(itm => itm === item)
        return this.removeAt(index)
      }
    })
    return arr
  }

  makeArrayAccessor(name, _name) {
    Object.defineProperty(this, name, {
      get() { return this[_name] },
      set(value) {
        this[_name] = this.alterArrayMethods(name, value)
        this.runArraySetter(name, value)
      }
    })
  }

  makeGetArrayAccessor(name, _name, get, set) {
    Object.defineProperty(this, name, {
      get() { return this[_name] },
      set(value) {
        value = this[_name] = get.apply(this) || []
        // if (set && value !== undefined) set.call(this, value)
        if (set) set.call(this, value)
        this[_name] = this.alterArrayMethods(name, value)
        this.runArraySetter(name, value)
      }
    })
  }

  runSetter(name, value) {
    this.cacheElements[name].forEach((element, i) => {
      const tname = `_${name}_html`
      let attrName
      if (element.attrName) {
        attrName = element.attrName
        element = element.element
      }
      if (attrName === 'value') {
        if (element !== document.activeElement) element.value = value
      } else if (attrName === 'checked') {
        element.checked = value
      } else if (attrName === 'checkedValue') {
        if (element.value === value) element.checked = true
      } else if (attrName === 'selectedIndex') {
        // element.selectedIndex = checkedValue
      } else if (attrName) {
        element.setAttribute(attrName, value)
      } else if (this[tname] && this[tname][i]) {
        element.innerHTML = value
      } else {
        element.textContent = value
      }
    })
    this.setDepProp(name)
  }

  runArraySetter(name, value) {
    value.keys = value.map(makeKey)
    this.cacheElements[name].forEach(elPair => {
      if (elPair.parent.attrName) return
      elPair.parent.textContent = ''
      elPair.children.length = 0
      elPair.children = value.map((item, i) => {
        const child = setKey(elPair.map(item, i), value.keys[i])
        elPair.parent.appendChild(child)
        return child
      })
    })
    this.setDepProp(name)
  }

  runElSetter(name) {
    const arr = this.cacheElements[name]
    this.cacheElements[name].forEach(elPair => {
      if (elPair.child) elPair.parent.removeChild(elPair.child)
      let child = this[name]
      if (isEl(child)) child = new Element(child).create()
      elPair.child = child
      elPair.parent.appendChild(child)
    })
    this.setDepProp(name)
  }

  setDepProp(name) {
    if (this.depGetters[name]) {
      this.depGetters[name].forEach(depName => {
        if (/^__link_/.test(depName)) {
          this[depName]()
        } else {
          this[depName] = undefined   // this[depName]
          // this[depName] = this[depName]
        }
      })
    }
  }
}

el.setData = data => new Data(data)

let _linkedDepProp = 0
const getLinkedDepProp = () => '__link_' + _linkedDepProp++
el.linkData = function linkData() {
  const deps = Array.from(arguments)
  const data = deps.shift()
  const func = deps.pop()
  const linkedDepProp = getLinkedDepProp()
  deps.forEach(dep => {
    data.depGetters[dep].push(linkedDepProp)
    data[linkedDepProp] = func
  })
}

el.linkData = function linkData() {
  const args = Array.from(arguments)
  const func = args.pop()
  const dataset = splitDataset(args)
  dataset.forEach(data => {
    const depObj = data.shift()
    const deps = data
    const linkedDepProp = getLinkedDepProp()
    deps.forEach(dep => {
      depObj.depGetters[dep] = depObj.depGetters[dep] || []
      depObj.depGetters[dep].push(linkedDepProp)
      depObj[linkedDepProp] = func
    })
  })
  func()
}
const splitDataset = args => {
  const dataset = []
  let data = []
  args.forEach(arg => {
    switch (typeof arg) {
      case 'object':
        if (data.length >= 2) dataset.push(data)
        data = [arg]
        break
      case 'string': data.push(arg); break
      default: throw new TypeError(`Incorrect el.linkData parameter ${arg}.`)
    }
  })
  dataset.push(data)
  return dataset
}
