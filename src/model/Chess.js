
/* Helpers */
const TAKE_COLOR = { red: 1, black: -1 }
const COLOR_CODE = { 1: 'red', '-1': 'black' }
const takeAnother = color => COLOR_CODE[-TAKE_COLOR[color]]
const takeRandom = () => Math.random() >= 0.5 ? 'red' : 'black'


export default class Chess {
  constructor(name) {
    this.name = name
  }

  get timer() { return this._timer || 3 * 60 * 1000 }   // default: 3 min
  set timer(t) { this._timer = t * 60 * 1000 }

  connect(playerA, playerB) {
    playerA.side = 'A'
    playerB.side = 'B'

    const takeA = playerA.take
    const takeB = playerB.take
    if (takeA) {
      if (takeA === takeB) playerA.take = takeRandom()
      playerB.take = takeAnother(playerA.take)
    } else {
      if (!takeB) playerB.take = takeRandom()
      playerA.take = takeAnother(playerB.take)
    }
  }

  toString() {}
  toJSON() {}
}
