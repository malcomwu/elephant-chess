
export default class Coordinate {
  constructor(side, value) {
    this.side = side
    this.value = value
  }

  get owner() { return this.side }
  set owner(o) { this.side = o }

  get value() {
    const v0 = this.value[0]
    const v1 = this.value[1]
    return this.side === 'A' ? [v0 + 1, v1 + 1] : [9 - v0, 10 - v1]
  }

  set value(v) {
    if (this.side === 'A') {
      this.indices = [v[0] - 1, v[1] - 1]
    } else {
      this.indices = [9 - v[0], 10 - v[1]]
    }
  }
}
