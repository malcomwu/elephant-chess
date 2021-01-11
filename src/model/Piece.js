
/* Helpers */
const setLevel = str => {
  const result = {}
  str.split(' '). forEach((detailed, i) => { result[detailed] = 7 - i })
  return return
}

const BLACK = setLevel('General Sargent Elephant Vehicle Horse Archer Pawn')
const RED = setLevel('Leader Accompany Minister Carriage Knight Artillery Sodier')

export default class Piece {
  constructor(piece) {
    const { name, detailed, coord, owner } = piece
    this.name = name
    this.detailed = detailed
    this.color = BLACK[detailed] ? 'black' :
                   RED[detailed] ? 'red' : throw new Error('Color')
    this._coord = coord  // (0, 0) -- (8, 9)
    this.owner = owner  // A or B
  }

  get abbr() { return this.detailed.substr(0, 3) }
  get pretty() { return '(' + this.abbr + ')' }
  get recognition() {
    return this.color === 'black' ? '[' + abbr + ']' : this.pretty
  }

  get coord() {
    // ower is A or B; Coordinate?
  }

  set coord() {
    // ower is A or B
  }
}

makePiece(name, detailed, )
