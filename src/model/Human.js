
export default class Human {
  constructor(name, take) {
    this.name = name
    this.take = take
    // this.side = A | B  // set by Chess#connect()
  }

  toString() {}
  toJSON() {}
}
