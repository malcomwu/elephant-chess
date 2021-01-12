
/* Helpers */
const WEIGHT = [100, 10, 10, 30, 20, 25, 3]
const setWeight = str => {
  const result = {}
  str.split(' '). forEach((detailed, i) => { result[detailed] = WEIGHT[i] })
  return result
}

import Coordinate from './Coordinate'

const BLACK = setWeight('General Sargent Elephant Vehicle Horse Archer Pawn')
const RED = setWeight('Leader Accompany Minister Carriage Knight Artillery Sodier')

const nameToDetailed = name => {
  return name[0].toUpperCase() + name.substr(1).replace(/\d/, '')
}
const error = () => { throw new Error('Color') }

export default class Piece {
  constructor(name, side, coord) {
    this.name = name
    this.detailed = nameToDetailed(name)
    this.color = BLACK[this.detailed] ? 'black' :
                   RED[this.detailed] ? 'red' : error()
    this.coord = new Coordinate(side, coord)
  }

  get abbr() { return this.detailed.substr(0, 3) }
  get pretty() { return '(' + this.abbr + ')' }
  get recognition() {
    return this.color === 'black' ? '[' + abbr + ']' : this.pretty
  }
}
