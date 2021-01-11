import el from 'el'

const detailed = `
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
`

const pretty = `
                             (Black)

        1     2     3     4     5     6     7     8     9
  =============================================================
  ||                                                         ||
1 ||  (Veh)-(Hor)-(Ele)-(Sar)-(Gen)-(Sar)-(Ele)-(Hor)-(Veh)  ||
  ||    |     |     |     |  \\  |  /  |     |     |     |    ||
2 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||
  ||    |     |     |     |  /  |  \\  |     |     |     |    ||
3 ||    +---(Arc)---+-----+-----+-----+-----+---(Arc)---+    ||
  ||    |     |     |     |     |     |     |     |     |    ||
4 ||  (Paw)---+---(Paw)---+---(Paw)---+---(Paw)---+---(Paw)  ||
  ||    |     |     |     |     |     |     |     |     |    ||
5 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||
  ||    |    River Chu                  Han Boundary    |    ||
5 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||
  ||    |     |     |     |     |     |     |     |     |    ||
4 ||  (Sol)---+---(Sol)---+---(Sol)---+---(Sol)---+---(Sol)  ||
  ||    |     |     |     |     |     |     |     |     |    ||
3 ||    +---(Art)---+-----+-----+-----+-----+---(Art)---+    ||
  ||    |     |     |     |  \\  |  /  |     |     |     |    ||
2 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||
  ||    |     |     |     |  /  |  \\  |     |     |     |    ||
1 ||  (Car)-(Kni)-(Min)-(Acc)-(Lea)-(Acc)-(Min)-(Kni)-(Car)  ||
  ||                                                         ||
  =============================================================
        9     8     7     6     5     4     3     2     1

                              (Red)
`

const recognition = `
                             [Black]

        1     2     3     4     5     6     7     8     9
  =============================================================
  ||                                                         ||
1 ||  [Veh]-[Hor]-[Ele]-[Sar]-[Gen]-[Sar]-[Ele]-[Hor]-[Veh]  ||
  ||    |     |     |     |  \\  |  /  |     |     |     |    ||
2 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||
  ||    |     |     |     |  /  |  \\  |     |     |     |    ||
3 ||    +---[Arc]---+-----+-----+-----+-----+---[Arc]---+    ||
  ||    |     |     |     |     |     |     |     |     |    ||
4 || [Paw]----+---[Paw]---+---[Paw]---+---[Paw]---+---[Paw]  ||
  ||    |     |     |     |     |     |     |     |     |    ||
5 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||
  ||    |    River Chu                  Han Boundary    |    ||
5 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||
  ||    |     |     |     |     |     |     |     |     |    ||
4 ||  (Sol)---+---(Sol)---+---(Sol)---+---(Sol)---+---(Sol)  ||
  ||    |     |     |     |     |     |     |     |     |    ||
3 ||    +---(Art)---+-----+-----+-----+-----+---(Art)---+    ||
  ||    |     |     |     |  \\  |  /  |     |     |     |    ||
2 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||
  ||    |     |     |     |  /  |  \\  |     |     |     |    ||
1 ||  (Car)-(Kni)-(Min)-(Acc)-(Lea)-(Acc)-(Min)-(Kni)-(Car)  ||
  ||                                                         ||
  =============================================================
        9     8     7     6     5     4     3     2     1

                              (Red)
`

export default function appElement() {
  return el.create('div', [
    el('h2', 'Prototye'),
    el('p', `The first product is text-based and use command to chess.
             The command history will be aside. It will be less interactive.
             The future version may include graphical user interface (GUI) such
             as color, click and hint the possible moves. If one can play in
             the text mode good, one can play in GUI very good`),
    el('h3', 'Detailed style'),
    el('pre', {
      style: 'background-color: #dd7; padding: 20px; border: 2px solid #aa6; width: 570px'
    }, detailed),

    el('h3', 'Pretty style'),
    el('pre', {
      style: 'background-color: #dd7; padding: 20px; border: 2px solid #aa6; width: 465px'
    }, pretty),

    el('h3', 'Recognition style'),
    el('pre', {
      style: 'background-color: #dd7; padding: 20px; border: 2px solid #aa6; width: 465px'
    }, recognition)
  ])
}
