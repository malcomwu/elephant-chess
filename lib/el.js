/* el v1.0.0 rewrite (test) */

/* Helpers */
const { concat } = []
const flatten = arr => concat.apply([], arr)
const repeat = (rep, num) => new Array(num + 1).join(rep)
const arrayToSet = arr => {
  const result = {}
  arr.forEach(name => { result[name] = true })
  return result
}

// Ref: A complete list of the void elements in HTML
// https://www.w3.org/TR/2011/WD-html-markup-20110113/syntax.html
const VOID_ELEMENTS = arrayToSet([
  'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input',
  'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
])

const EVENT_TYPES = arrayToSet([
  /* mouse */ 'mousedown', 'mouseup', 'click', 'dblclick', 'mousemove',
              'mouseover', 'mousewheel', 'mouseout', 'contextmenu',
  /* touch */ 'touchstart', 'touchmove', 'touchend', 'touchcancel',
  /* keyboard */ 'keydown', 'keypress', 'keyup',
  /* form */ 'focus', 'blur', 'change', 'submit',
  /* window */ 'scroll', 'resize', 'hashchange', 'load', 'unload', 'input'
])

const INPUT_VALUE_TYPE = arrayToSet([
  'text', 'number', 'password', 'textarea', 'color', 'range',
  'date', 'datetime-local', 'month', 'week', 'time', 'email', 'file',
  'search', 'tel', 'url', 'select-multiple', 'select-one'
])

// The SVG namespace shared with HTML; execption: a, encoded in svg:a.
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'
const SVG_ELEMENTS = arrayToSet([
  // 'a',
  'svg:a', 'animate', 'animateMotion', 'animateTransform',
  'circle', 'clipPath', 'color-profile',
  'defs', 'desc', 'discard', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight','feDropShadow', 'feFlood',
  'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight',
  'feTile', 'feTurbulence', 'filter', 'foreignObject',
  'g', 'hatch', 'hatchpath', 'image', 'line', 'linearGradient',
  'marker', 'mask', 'mesh', 'meshgradient', 'meshpatch', 'meshrow',
  'metadata', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'script', 'set', 'solidcolor', 'stop', 'style', 'svg', 'switch', 'symbol',
  'text', 'textPath', 'title', 'tspan', 'unknown', 'use', 'view'
])

const isHTMLElement = el => el && 'appendChild' in el && 'removeChild' in el

// It has problem (tmp); if not possible, validate name.
const isEl = el => el && el.name


class Element {
  // The element is a plain object in { name, attributes: {}, content: [] }.
  constructor(element, level = 0, indent = 2) {
    this.level = level
    this.indent = indent

    this.name = element.name
    this.attributes = new Attributes(element.attributes)
    this.content = []
    element.content.forEach(child => {
      if (isEl(child)) {
        this.content.push(new Element(child, level + 1, indent))
      } else {
        this.content.push(child)
      }
    })
  }

  eachChild(cb) { this.content.forEach(cb) }
  eachAttribute(cb) { this.attributes.each(cb) }

  create() {
    let  name = this.name
    let  element  // an HTML or SVG element
    if (SVG_ELEMENTS[name]) {
      if (name === 'svg:a') name = 'a'
      element = document.createElementNS(SVG_NAMESPACE, name)
    } else {
      element = document.createElement(name)
    }

    this.eachAttribute((value, name) => {
      if (EVENT_TYPES[name]) {
        element.addEventListener(name, value)
      } else if (name === 'value') {

// Begin of input: to be checked.
        if (typeof value === 'function') {
          value({ element, attrName: name })
          if (INPUT_VALUE_TYPE[element.type]) {
            element.addEventListener('input', () => {
              value.data[value.dname] = element.value
            })
          }
        } else {
          element.value = value
        }
      } else if (name === 'checked' && element.type === 'checkbox') {
        if (typeof value === 'function') {  // duplicated
          value({ element, attrName: name })
          element.addEventListener('input', () => {
            value.data[value.dname] = element.checked
          })
        } else {
          element.checked = value
        }
      } else if (name === 'checkedValue' && element.type === 'radio') {
        value({ element, attrName: name })
        element.addEventListener('input', () => {
          value.data[value.dname] = element.value
        })
      } else if (name === 'selectedIndex') {
        value({ element, attrName: name })
        element.addEventListener('input', () => {
          value.data[value.dname] = element.selectedIndex
        })
      } else if (name === 'selectedOptions') {
        value({ element, attrName: name })
        element.addEventListener('input', () => {
          value.data[value.dname] = Array.from(element.selectedOptions)
            .map(option => {
              const { label, value, text } = option
              return { label, value, text }
            })
        })
      } else if (typeof value === 'function') {
        value({ element, attrName: name })
/// End of input

      } else if (name === 'style') {
        if (/\n/.test(value)) {
          value = value.trim().replace(/ *\n */g, ';')
        }
        element.setAttribute(name, value)
      } else {
        element.setAttribute(name, value)
      }
    })

    this.eachChild(child => {
      if (child instanceof Element) {
        element.appendChild(child.create())
      } else if (typeof child === 'object') {
        if ('html' in child) {
          if (typeof child.html === 'function') {   // el.Data
            child.html(element, 'html')
          } else {
            element.innerHTML = child.html
          }
        } else {
          element.appendChild(child)   // child is a DOM Element
        }
      } else if (typeof child === 'function') {   // el.Data
        child(element)
      } else {
        // element.textContent = child  // this does not support mixed content
        const tnode = document.createTextNode(child)
        element.appendChild(tnode)
      }
    })
    return element
  }

  toString() {
    const { level, indent, name, attributes, content } = this
    const strs = []
    if (level > 0) strs.push('\n' + repeat(' ', level * indent))
    strs.push(`<${name}`)
    if (attributes.hasValue) strs.push(' ' + attributes)

    if (content.length === 0) {
      // For XML
      // strs.push('/>')

      // For HTML and also valid XML.
      if (VOID_ELEMENTS[name]) {
        strs.push('>')
      } else {
        strs.push(`></${name}>`)
      }

    } else if (!isEl(content[0])) {
      strs.push(`>${content}</${name}>`)
    } else {
      strs.push('>', content.join(''))
      strs.push('\n', repeat(' ', level * indent), `</${name}>`)
    }
    return strs.join('')
  }

  toJSON() {
    const { name, attributes, content } = this
    return { name, attributes, content }
  }
}

class Attributes {
  constructor(attributes = {}) {
    this.value = attributes
  }

  get hasValue() { return Object.keys(this.value).length > 0 }

  each(cb) {
    const { value } = this
    Object.keys(value).forEach(name => cb(value[name], name))
  }

  toString() {
    const strs = []
    for (let name in this.value) strs.push(`${name}="${this.value[name]}"`)
    return strs.join(' ')
  }

  toJSON() { return this.value }
}

export default function el(name, attributes = {}, content = []) {
  if (!Array.isArray(content)) content = [content]
  if (typeof attributes !== 'object' || isEl(attributes) ||
                                        isHTMLElement(attributes)) {
    attributes = [attributes]
  }
  if (Array.isArray(attributes)) { content = attributes; attributes = {} }
  content = flatten(content)
  return { name, attributes, content }
}

el.create = (name, attributes, content) => {
  if (typeof name === 'object') return new Element(name).create()
  return new Element(el(name, attributes, content)).create()
}

el.toHtml = el => new Element(el).toString()


/* Sugars */

el.html = (name, attributes, content) => {
  if (typeof content === 'undefined') { content = attributes; attributes = {} }
  return el(name, attributes, { html: content })
}

el.nbsp = num => repeat('\u00a0', num || 1)
