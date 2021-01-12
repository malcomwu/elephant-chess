# el
A lightweight document object model (DOM) mimics in JavaScript object.

## API in brief
1. `el(name, attributes = {}, content = [])`, `el(name, attributes)`,
  `el(name, content)`, `el(name)`: `name` is element name and content can be
  children or primitive to render text. It, el(), resulted in a plain object.
2. `el.create()` is the same as above and results in a DOM Element.
3. `el.toHTML(el1)` converts to plain object `el1` to HTML string.
4. `el.html()` in `innerHTML`.
5. `el.nbsp(n)` produce `n` none-breaking spaces (nbsp).


## References
1. [Eloquent JavaScript](https://eloquentjavascript.net/)
