import Piece from './Piece'

const red = {
  leader: [5, 1],
  accompany1: [4, 1],
  accompany2: [6, 1],
  minister1: [3, 1],
  minister2: [7, 1],
  knight1: [2, 1],
  knight2: [8, 1],
  carriage1: [1, 1],
  carriage2: [9, 1],
  artillery1: [2, 3],
  artillery2: [8, 3],
  sodier1: [1, 4],
  sodier2: [3, 4],
  sodier3: [5, 4],
  sodier4: [7, 4],
  sodier5: [9, 4]
}

const black = {
  general: [5, 1],
  sargent1: [4, 1],
  sargent2: [6, 1],
  elephant1: [3, 1],
  elephant2: [7, 1],
  horse1: [2, 1],
  horse2: [8, 1],
  vehicle1: [1, 1],
  vehicle2: [9, 1],
  archer1: [2, 3],
  archer2: [8, 3],
  pawn1: [1, 4],
  pawn2: [3, 4],
  pawn3: [5, 4],
  pawn4: [7, 4],
  pawn5: [9, 4]
}

export default function getPieces(colorA = 'black') {
  const pieces = []

  if (colorA === 'black') {
    Object.keys(black).forEach(name => {
      pieces.push(new Piece(name, 'A', black[name]))
    })
    Object.keys(red).forEach(name => {
      pieces.push(new Piece(name, 'B', red[name]))
    })
  } else {
    Object.keys(black).forEach(name => {
      pieces.push(new Piece(name, 'B', black[name]))
    })
    Object.keys(red).forEach(name => {
      pieces.push(new Piece(name, 'A', red[name]))
    })
  }

  return pieces
}
