
export default class Grid {
  constructor(pieces, colorA) {
    if (!colorA) throw new Error('Color undefined for side A.')
    this.pieces = pieces
    this.colorA = colorA
    this.colorB = colorA === 'black' ? 'red' : 'black'
    this.init()
    this.fill()
  }

  init() {
    this.value = []
    const rows = 10, columns = 9
    for (let i = 0; i < rows; i++) {
      this.value[i] = []
      for (let j = 0; j < columns; j++) this.value[i][j] = null
    }
  }

  fill() {
    this.pieces.forEach(piece => {
      const { indices } = piece.coord
      this.value[indices[0]][indices[1]] = piece
    })
  }
}
