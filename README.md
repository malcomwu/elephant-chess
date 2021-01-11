# Elephant chess v0.1.0-delta
A Chinese chess, namely elephant chess (象棋).


## Usage

**Nodejs**
```
const chess = new Chess('Fair play')
const john = new Human('John Smith')
const marry = new Computer('Marry Parker')
chess.connect(john, marry)  // currently without network connection
chess.set(3)
chess.game()
chess.game()  // possible set
chess.game()  // set or error
chess.game()  // error

// Feature in v2.0: use firebase for remote players.
```

**Browser**
```
// To be described.
```


## Roles
```
==========================================================
Black 黑       Red 紅         Role 角色         Amount
----------------------------------------------------------
General* 將    Leader+ 帥     King 王              1
Sargent 士     Accompany 仕   Secretary 卿         2
Elephant 象    Minister 相    Assistant 宰         2
Vehicle 車     Carriage 俥    Officer 官           2
Horse 馬       Knight 傌      Governor 督          2
Archer 砲 包   Artillery 炮   Artillery            2
Pawn 卒        Sodier 兵      infantry             5
==========================================================
*General (tiger, fighter)
+Leader (lion, commander)
```


## Layout

Layout in a 10 x 9 grid.

**Style:** detailed

```
                                      (Black)

    1        2        3        4        5        6        7        8        9

1 Vehicle--Horse--Elephant--Sargent--General--Sargent-Elephant---Horse--Vehicle
    |        |        |        |   \    |    /   |        |        |        |
2   +--------+--------+--------+--------+--------+--------+--------+--------+
    |        |        |        |   /    |    \   |        |        |        |
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
    |        |        |        |   \    |    /   |        |        |        |
2   +--------+--------+--------+--------+--------+--------+--------+--------+
    |        |        |        |   /    |    \   |        |        |        |
1 Carriage Knight Minister Accompany Leader Accompany Minister Knight Carriage

     9        8        7        6        5        4        3        2        1

                                       (Red)
```

**Style:** pretty

```
                             (Black)

        1     2     3     4     5     6     7     8     9
  =============================================================
  ||                                                         ||
1 ||  (Veh)-(Hor)-(Ele)-(Sar)-(Gen)-(Sar)-(Ele)-(Hor)-(Veh)  ||
  ||    |     |     |     |  \  |  /  |     |     |     |    ||
2 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||
  ||    |     |     |     |  /  |  \  |     |     |     |    ||
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
  ||    |     |     |     |  \  |  /  |     |     |     |    ||
2 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||
  ||    |     |     |     |  /  |  \  |     |     |     |    ||
1 ||  (Car)-(Kni)-(Min)-(Acc)-(Lea)-(Acc)-(Min)-(Kni)-(Car)  ||
  ||                                                         ||
  =============================================================
        9     8     7     6     5     4     3     2     1

                              (Red)
```

**Style:** recognition

```
                             [Black]

        1     2     3     4     5     6     7     8     9
  =============================================================
  ||                                                         ||
1 ||  [Veh]-[Hor]-[Ele]-[Sar]-[Gen]-[Sar]-[Ele]-[Hor]-[Veh]  ||
  ||    |     |     |     |  \  |  /  |     |     |     |    ||
2 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||
  ||    |     |     |     |  /  |  \  |     |     |     |    ||
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
  ||    |     |     |     |  \  |  /  |     |     |     |    ||
2 ||    +-----+-----+-----+-----+-----+-----+-----+-----+    ||
  ||    |     |     |     |  /  |  \  |     |     |     |    ||
1 ||  (Car)-(Kni)-(Min)-(Acc)-(Lea)-(Acc)-(Min)-(Kni)-(Car)  ||
  ||                                                         ||
  =============================================================
        9     8     7     6     5     4     3     2     1

                              (Red)
```


## Rules
1. The king cannot see the king or it is checkmated. It stays and cannot go out
   of the king's farm (田) and moves step by step. It hits and eats.
2. The secretary walks in mouth (口) in (off-)diagonal, in the boundary of
   farm (田) overlapping rice (米). It hits and eats.
3. The assistant walks in farm (田) in (off-)diagonal and it cannot go through
   the river. If the middle of farm is blocked, the assistant cannot go.
   It hits and eats.
4. The officer goes straight in front, back, left and right and it hits and eats.
5. The governor walks in sun (日) or the same in vertical as
   ```
   +-+-+     +-+-+
   +-+-+     * b +
   ```
   and if it is blocked (b), it (`*`) cannot go. It hits and eats.
6. The artillery go the same as the officier to move but it cannot hit to eat.
   It jumps over a single role and hits to eat.
7. The infantry can only go step by step. It can only go ahead before crossing
   the river. After crossing the river, it can also go left and right. It hits
   and eats.


## Notes
1. Only the red can eat the black and the black to eat the red. Red-red and
   black-black cannot eat each other.
2. Any role can hit and eat. The rule implies that the king, the secretaries
   and the assistants cannot eat each othere because they cannot go accross
   the river. The only exception is the king eats the king when one is shown.
   However, it is not to eat it and it is one of the checkmate.


## Starup
1. The host setup the table for the chess.
2. Two players decide to take the red or black based on his or her
   characteristics as general or leader.
3. If they cannot decided it, the host flip coin.
4. Three games or five games for a set is desided by the players or the host.
5. The rule is red first. This is because the red need the layout for the
   strategy and the black does not need it as much because the general is more
   often in tactics.
6. For the next game, one is to take turn, another is loser first or loser
   choice.
7. The language of the chess pieces is in English. It is fair or it is too easy
   for the Chinese and Eastern people to win.


## Technical details

**Coordinate of the grid**

Internal index system: (0, 0)--(8, 9)
```
(1--5; b-u)    side A (player A; take b/r)

   0   1   2   3   4   5   6   7   8  (1--9; r-l)
0  +---+---+---+---+---+---+---+---+
   |   |   |   | \ | / |   |   |   |
1  +---+---+---+---+---+---+---+---+
   |   |   |   | / | \ |   |   |   |
2  +---#---+---+---+---+---+---#---+
   |   |   |   |   |   |   |   |   |
3  #---+---#---+---#---+---#---+---#
   |   |   |   |   |   |   |   |   |
4  +---+---+---+---+---+---+---+---+
   |                               |
5  +---+---+---+---+---+---+---+---+
   |   |   |   |   |   |   |   |   |
6  #---+---#---+---#---+---#---+---#
   |   |   |   |   |   |   |   |   |
7  +---#---+---+---+---+---+---#---+
   |   |   |   | \ | / |   |   |   |
8  +---+---+---+---+---+---+---+---+
   |   |   |   | / | \ |   |   |   |
9  +---+---+---+---+---+---+---+---+  (9--1; r-l)

(1--5; b-u)    side B (player B; take r/b)
```
