import getPieces from './getPieces'
import Grid from './Grid'

/* Helpers */
const TAKE_COLOR = { red: 1, black: -1 }
const COLOR_CODE = { 1: 'red', '-1': 'black' }
const takeAnother = color => COLOR_CODE[-TAKE_COLOR[color]]
const takeRandom = () => Math.random() >= 0.5 ? 'red' : 'black'

const makeGrid = () => {
  const grid = []
  const rows = 10, columns = 9
  for (let i = 0; i < row; i++) {
    grid[i] = []
    for (let j = 0; j < columns; j++) grid[i][j] = null
  }
  return grid
}


export default class Chess {
  constructor(name) {
    this.name = name
  }

  get timer() { return this._timer || 3 * 60 * 1000 }   // default: 3 min
  set timer(t) { this._timer = t * 60 * 1000 }

  connect(playerA, playerB) {
    playerA.side = 'A'
    playerB.side = 'B'

    if (playerA.take) {
      if (playerA.take === playerB.take) playerA.take = takeRandom()
      playerB.take = takeAnother(playerA.take)
    } else {
      if (!playerB.take) playerB.take = takeRandom()
      playerA.take = takeAnother(playerB.take)
    }

    this.colorA = playerA.take
    this.colorB = playerB.take

    this.pieces = getPieces(playerA.take)
    playerA.pieces = this.pieces.filter(piece => piece.color === playerA.take)
    playerB.pieces = this.pieces.filter(piece => piece.color === playerB.take)

    this.updateGrid()
  }

  updateGrid() {
    this.grid = new Grid(this.pieces, this.colorA)
  }

  toString() {}
  toJSON() {}
}
