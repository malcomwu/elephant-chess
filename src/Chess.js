
const getPieces = (take = 'red') => {
  const r = take === 'red'
  return {
    red: {
      leader: r ? [4, 0] : [4, 9],
      accompany1: r ? [3, 0] : [5, 9],
      accompany2: r ? [5, 0] : [3, 9],
      minister1: r ? [2, 0] : [6, 9],
      minister2: r ? [6, 0] : [2, 9],
      knight1: r ? [1, 0] : [7, 9],
      knight2: r ? [7, 0] : [1, 9],
      carriage1: r ? [0, 0] : [8, 9],
      carriage2: r ? [8, 0] : [0, 9],

      artillery1: r ? [1, 2] : [7, 7],
      artillery2: r ? [7, 2] : [1, 7],

      Sodier1: r ? [0, 3] : [8, 6],
      Sodier2: r ? [2, 3] : [6, 6],
      Sodier3: r ? [4, 3] : [4, 6],
      Sodier4: r ? [6, 3] : [2, 6],
      Sodier5: r ? [8, 3] : [0, 6]
    },

    black: {
      general: r ? [4, 9] : [4, 0],
      sargent1: r ? [5, 9] : [3, 0],
      sargent2: r ? [3, 9] : [5, 0],
      elephant1: r ? [6, 9] : [2, 0],
      elephant2: r ? [2, 9] : [6, 0],
      vehicle1: r ? [7, 9] : [1, 0],
      vehicle2: r ? [1, 9] : [7, 0],
      horse1: r ? [8, 9] : [0, 0],
      horse2: r ? [0, 9] : [8, 0],

      archer1: r ? [7, 7] : [1, 2],
      archer2: r ? [1, 7] : [7, 2],

      pawn1: r ? [8, 6] : [0, 3],
      pawn2: r ? [6, 6] : [2, 3],
      pawn3: r ? [4, 6] : [4, 3],
      pawn4: r ? [2, 6] : [6, 3],
      pawn5: r ? [0, 6] : [8, 3]
    }
  }
}

export default class Chess {
  constructor(player1, player2) {
    this.name = 'chess'
    if (player1 && player2) this.connect(player1, player2s)
  }

  connect(player1, player2) {

  }

  render() {

  }

  toString() {}
  toJSON() {}
}
