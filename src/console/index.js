// import Chess from './Chess'
// import Human from './Human'
// import Computer from './Computer'

// const lisa = new Computer('Lisa')
// const loro = new Computer('Loro')
// const chess = new Chess(lisa, loro)

const readline = require('readline')
readline.emitKeypressEvents(process.stdin)

process.stdin.setRawMode(true)
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit()
  } else {
    console.log(`You pressed the "${str}" key`)
    console.log()
    console.log(key)
    console.log()
  }
})
console.log('Press any key...')
