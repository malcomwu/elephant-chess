import Piece from './Piece'

const red = {
  leader: [1, 5],
  accompany1: [1, 4],
  accompany2: [1, 6],
  minister1: [1, 3],
  minister2: [1, 7],
  knight1: [1, 2],
  knight2: [1, 8],
  carriage1: [1, 1],
  carriage2: [1, 9],
  // artillery1: [3, 2],
  artillery1: [3, 5],
  artillery2: [3, 8],
  sodier1: [4, 1],
  sodier2: [4, 3],
  sodier3: [4, 5],
  // sodier4: [4, 7],
  sodier4: [5, 7],
  sodier5: [4, 9]
}

const black = {
  general: [1, 5],

  // sargent1: [1, 4],
  sargent1: [2, 5],

  sargent2: [1, 6],

  // elephant1: [1, 3],
  elephant1: [3, 5],

  elephant2: [1, 7],

  // horse1: [1, 2],
  horse1: [3, 3],

  horse2: [1, 8],
  vehicle1: [1, 1],
  vehicle2: [1, 9],
  archer1: [3, 2],
  archer2: [3, 8],
  pawn1: [4, 1],
  pawn2: [4, 3],
  pawn3: [4, 5],
  pawn4: [4, 7],
  pawn5: [4, 9]
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
