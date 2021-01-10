# Elephant-chess
A Chinese chess, namely elephant chess (象棋).


## Roles
```
==========================================================================
Black 黑       Red 紅         Role 角色         Amount
--------------------------------------------------------------------------
General 將     Leader 帥      King 王              1
(Tiger)        (Lion)        Fighter-Commander    2
Being 士       Accompany 仕   Secretary 卿         2
Elephant 象    Minister 相    Assistant 宰         2
Car 車         Carriage 俥    Officer 官           2
Hourse 馬      Knight 傌      Governor 督          2
Archer 砲      Artillery 炮   Artillery            2
Prisoner 卒    Sodier 兵      infantry             5
==========================================================================
*Being is sargent.
```

## Layout

```
  1         2         3        4       5       6        7         8        9
  +---------+---------+--------+-------+-------+---------+---------+---------+
1 Car    Hourse   Elephant   Being  General  Being   Elephant   Hourse     Car
2 |                                    米                                    |
3 |  Archer                                                    Archer        |
4 Prisoner        Prisoner          Prisoner      Prisoner      Prisoner     |
5 +---------+---------+--------+-------+-------+---------+---------+---------+
  |           River                                       Boundary           |
5 +---------+---------+--------+-------+-------+---------+---------+---------+
4 Sodier           Sodier            Sodier            Sodier           Sodier 
3 | Artillery                                                Artillery       |
2 |                                    米                                    |
1 Carriage Knight Minister Accompany Leader Accompany Minister Knight Carriage
  +---------+---------+--------+-------+-------+---------+---------+---------+
  9          8        7        6       5        4        3        2        1
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
