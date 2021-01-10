const print = console.log

// export default class View {
const View = module.exports = class View {
  constructor(style) {
    this.name = 'view'
    this.style = style
  }

  render() {
    switch (this.style) {
      case 'detailed': this.renderDetailed(); break
      case 'pretty': this.renderPretty(); break
      case 'recognition': this.renderRecognition(); break
      default: throw new Error(`Unknown style: ${this.style}`)
    }
  }

  renderDetailed() {
    print(`
                                      (Black)

    1        2        3        4        5        6        7        8        9

1 Vehicle--Horse--Elephant--Sargent--General--Sargent-Elephant---Horse--Vehicle
    |        |        |        |   \\    |    /   |        |        |        |
2   +--------+--------+--------+--------+--------+--------+--------+--------+
    |        |        |        |   /    |    \\   |        |        |        |
3   +------Archer-----+--------+--------+--------+--------+------Archer-----+
    |        |        |        |        |        |        |        |        |
4 Pawn-------+------Pawn-------+------Pawn-------+------Pawn-------+------Pawn
    |        |        |        |        |        |        |        |        |
5   +--------+--------+--------+--------+--------+--------+--------+--------+
    |           River Chu                            Han Boundary           |
5   +--------+--------+--------+--------+--------+--------+--------+--------+
    |        |        |        |        |        |        |        |        |
4 Sodier-----+-----Sodier------+-----Sodier------+-----Sodier------+-----Sodier
    |        |        |        |        |        |        |        |        |
3   +----Artillery----+--------+--------+--------+--------+----Artillery----+
    |        |        |        |   \\    |    /   |        |        |        |
2   +--------+--------+--------+--------+--------+--------+--------+--------+
    |        |        |        |   /    |    \\   |        |        |        |
1 Carriage Knight Minister Accompany Leader Accompany Minister Knight Carriage

     9        8        7        6        5        4        3        2        1

                                       (Red)
`)
  }

  renderPretty() {
    print(' ')
    print('                               (Black)')
    print(' ')
    print('          1     2     3     4     5     6     7     8     9')
    print('    =============================================================')
    print('    ||                                                         ||')
    print('  1 ||  (Veh)-(Hor)-(Ele)-(Sar)-(Gen)-(Sar)-(Ele)-(Hor)-(Veh)  ||')
    print('    ||    |     |     |     |  \\  |  /  |     |     |     |    ||')
    print('  2 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||')
    print('    ||    |     |     |     |  /  |  \\  |     |     |     |    ||')
    print('  3 ||    +---(Arc)---+-----+-----+-----+-----+---(Arc)---+    ||')
    print('    ||    |     |     |     |     |     |     |     |     |    ||')
    print('  4 ||  (Paw)---+---(Paw)---+---(Paw)---+---(Paw)---+---(Paw)  ||')
    print('    ||    |     |     |     |     |     |     |     |     |    ||')
    print('  5 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||')
    print('    ||    |    River Chu                  Han Boundary    |    ||')
    print('  5 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||')
    print('    ||    |     |     |     |     |     |     |     |     |    ||')
    print('  4 ||  (Sol)---+---(Sol)---+---(Sol)---+---(Sol)---+---(Sol)  ||')
    print('    ||    |     |     |     |     |     |     |     |     |    ||')
    print('  3 ||    +---(Art)---+-----+-----+-----+-----+---(Art)---+    ||')
    print('    ||    |     |     |     |  \\  |  /  |     |     |     |    ||')
    print('  2 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||')
    print('    ||    |     |     |     |  /  |  \\  |     |     |     |    ||')
    print('  1 ||  (Car)-(Kni)-(Min)-(Acc)-(Lea)-(Acc)-(Min)-(Kni)-(Car)  ||')
    print('    ||                                                         ||')
    print('    =============================================================')
    print('          9     8     7     6     5     4     3     2     1')
    print(' ')
    print('                                (Red)')
  }

  renderRecognition() {
    print(' ')
    print('                               [Black]')
    print(' ')
    print('          1     2     3     4     5     6     7     8     9')
    print('    =============================================================')
    print('    ||                                                         ||')
    print('  1 ||  [Veh]-[Hor]-[Ele]-[Sar]-[Gen]-[Sar]-[Ele]-[Hor]-[Veh]  ||')
    print('    ||    |     |     |     |  \\  |  /  |     |     |     |    ||')
    print('  2 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||')
    print('    ||    |     |     |     |  /  |  \\  |     |     |     |    ||')
    print('  3 ||    +---[Arc]---+-----+-----+-----+-----+---[Arc]---+    ||')
    print('    ||    |     |     |     |     |     |     |     |     |    ||')
    print('  4 ||  [Paw]---+---[Paw]---+---[Paw]---+---[Paw]---+---[Paw]  ||')
    print('    ||    |     |     |     |     |     |     |     |     |    ||')
    print('  5 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||')
    print('    ||    |    River Chu                  Han Boundary    |    ||')
    print('  5 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||')
    print('    ||    |     |     |     |     |     |     |     |     |    ||')
    print('  4 ||  [Sol)---+---(Sol)---+---(Sol)---+---(Sol)---+---(Sol)  ||')
    print('    ||    |     |     |     |     |     |     |     |     |    ||')
    print('  3 ||    +---(Art)---+-----+-----+-----+-----+---(Art)---+    ||')
    print('    ||    |     |     |     |  \\  |  /  |     |     |     |    ||')
    print('  2 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||')
    print('    ||    |     |     |     |  /  |  \\  |     |     |     |    ||')
    print('  1 ||  [Car)-(Kni)-(Min)-(Acc)-(Lea)-(Acc)-(Min)-(Kni)-(Car)  ||')
    print('    ||                                                         ||')
    print('    =============================================================')
    print('          9     8     7     6     5     4     3     2     1')
    print(' ')
    print('                                (Red)')
  }
}

const v1 = new View('detailed')
v1.render()
const v2 = new View('pretty')
v2.render()
const v3 = new View('recognition')
v3.render()
