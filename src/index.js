import Chess from './model/Chess'
import Human from './model/Human'
import Computer from './model/Computer'
import appElement from './view/appElement'

const john = new Human('John Smith')
const marry = new Computer('Marry Parker')

const chess = new Chess('Fair play')
chess.connect(john, marry)

// chess.set(3)
// chess.game()
// chess.game()  // possible set
// chess.game()  // set or error
// chess.game()  // error

document.body.append(appElement(chess))
