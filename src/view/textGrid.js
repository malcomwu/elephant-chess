import el from 'el'

const pad = (num, ch = ' ') => new Array(num + 1).join(ch)
const captical = str => str[0].toUpperCase() + str.substr(1)

export default function texGrid(grid, style = 'detailed') {
  if (style === 'detailed') {
    return el('pre', {
      style: 'background-color: #dd7; padding: 20px; border: 2px solid #aa6; width: 580px'
    }, getDetailed(grid))
  }

  if (style === 'pretty') {
    return el('pre', {
      style: 'background-color: #dd7; padding: 20px; border: 2px solid #aa6; width: 465px'
    }, getPretty(grid))
  }

  if (style === 'recognition') {
    return el('pre', {
      style: 'background-color: #dd7; padding: 20px; border: 2px solid #aa6; width: 465px'
    }, getRecognition(grid))
  }

  throw new Error(`Unsupported style: ${style}`)
}

const middlePadders = {
  4: [2, 3], 5: [2, 2], 6: [1, 2], 7: [1, 1], 8: [0, 1], 9: [0, 0]
}
const leftPadders = {
  4: [2, 3], 5: [2, 2], 6: [2, 1], 7: [1, 1], 8: [1, 0], 9: [0, 0]
}
const rightPadders = { 4: 2, 5: 2, 6: 1, 7: 1, 8: 0, 9: 0 }

const getDetailed = grid => {
  const output = row => {
    const places = grid.value[row].map((piece, col) => {
      if (piece) {
        const { detailed } = piece
        const { length } = detailed
        if (col === 0) {
          const p = leftPadders[length]
          return pad(p[0]) + detailed + pad(p[1], '-')
        } else if (col === 8) {
          const p = rightPadders[length]
          return pad(p, '-') + detailed
        } else {
          const p = middlePadders[length]
          return pad(p[0], '-') + detailed + pad(p[1], '-')
        }
      }
      return outputDetailedMarker(row, col)
    })
    return avoidMerge(places).join('')
  }
  const avoidMerge = places => {  // not thorough but a quick fix
    return places.map((place, i) => {
      const prevPlace = places[i - 1]
      if (/[a-z]$/.test(prevPlace) && /^[A-Z].*\-$/.test(place)) {
        return '-' + place.substring(0, place.length - 1)
      }
      return place
    })
  }


  const lines = ['']
  lines.push(`                                      (A: ${captical(grid.colorA)})`, '')
  lines.push('     1        2        3        4        5        6        7        8        9', '')
  lines.push('1' + output(0))
  lines.push('     |        |        |        |   \\    |    /   |        |        |        |')
  lines.push('2' + output(1))
  lines.push('     |        |        |        |   /    |    \\   |        |        |        |')
  lines.push('3' + output(2))
  lines.push('     |        |        |        |        |        |        |        |        |')
  lines.push('4' + output(3))
  lines.push('     |        |        |        |        |        |        |        |        |')
  lines.push('5' + output(4))
  lines.push('     |           River Chu                            Han Boundary           |')
  lines.push('5' + output(5))
  lines.push('     |        |        |        |        |        |        |        |        |')
  lines.push('4' + output(6))
  lines.push('     |        |        |        |        |        |        |        |        |')
  lines.push('3' + output(7))
  lines.push('     |        |        |        |   \\    |    /   |        |        |        |')
  lines.push('2' + output(8))
  lines.push('     |        |        |        |   /    |    \\   |        |        |        |')
  lines.push('1' + output(9))
  lines.push('', `                                      (B: ${captical(grid.colorB)})`, '')
  lines.push('     1        2        3        4        5        6        7        8        9')

  return lines.join('\n')
}

const getPretty = grid => getAbbr(grid, 'pretty')
const getRecognition = grid => getAbbr(grid, 'recognition')

const getAbbr = (grid, style) => {
  const output = row => {
    return grid.value[row].map((piece, col) => {
      if (piece) {
        if (piece.color === 'black' && style === 'recognition') {
          return '[' + piece.abbr + ']'
        }
        return '(' + piece.abbr + ')'
      }
      return outputAbbrMarker(row, col)
    }).join('-')
  }

  const ColorA = grid.colorA === 'black' ? 'Black' : 'Red'
  const ColorB = grid.colorB === 'black' ? 'Black' : 'Red'
  const markerA = style === 'recognition' && ColorA === 'Black' ?
                            '[A: Black]' : `(A: ${ColorA})`
  const markerB = style === 'recognition' && ColorB === 'Black' ?
                            '[B: Black]' : `(B: ${ColorB})`

  const lines = ['']
  lines.push(`                            ${markerA}`, '')
  lines.push('        1     2     3     4     5     6     7     8     9')
  lines.push('  =============================================================')
  lines.push('  ||                                                         ||')
  lines.push('1 ||  ' + output(0) + '  ||')
  lines.push('  ||    |     |     |     |  \\  |  /  |     |     |     |    ||')
  lines.push('2 ||  ' + output(1) + '  ||')
  lines.push('  ||    |     |     |     |  /  |  \\  |     |     |     |    ||')
  lines.push('3 ||  ' + output(2) + '  ||')
  lines.push('  ||    |     |     |     |     |     |     |     |     |    ||')
  lines.push('4 ||  ' + output(3) + '  ||')
  lines.push('  ||    |     |     |     |     |     |     |     |     |    ||')
  lines.push('5 ||  ' + output(4) + '  ||')
  lines.push('  ||    |    River Chu                  Han Boundary    |    ||')
  lines.push('5 ||  ' + output(5) + '  ||')
  lines.push('  ||    |     |     |     |     |     |     |     |     |    ||')
  lines.push('4 ||  ' + output(6) + '  ||')
  lines.push('  ||    |     |     |     |     |     |     |     |     |    ||')
  lines.push('3 ||  ' + output(7) + '  ||')
  lines.push('  ||    |     |     |     |  \\  |  /  |     |     |     |    ||')
  lines.push('2 ||  ' + output(8) + '  ||')
  lines.push('  ||    |     |     |     |  /  |  \\  |     |     |     |    ||')
  lines.push('1 ||  ' + output(9) + '  ||')
  lines.push('  ||                                                         ||')
  lines.push('  =============================================================')
  lines.push('        9     8     7     6     5     4     3     2     1')
  lines.push('')
  lines.push(`                            ${markerB}`)

  return lines.join('\n')
}

const outputDetailedMarker = (row, col) => {
  // Archer/Artillary markers
  if (row === 2 || row === 7) {
    if (col === 1 || col === 7) return '----#----'
  }
  // Sodier/Pawn markers
  if (row === 3 || row === 6) {
    if (col === 0) return '    #----'
    if (col === 8) return '----#'
    if (col === 2 || col === 4 || col === 6) return '----#----'
  }
  if (col === 0) return '    +----'
  if (col === 8) return '----+'
    return '----+----'
}

const outputAbbrMarker = (row, col) => {
  // Archer/Artillary markers
  if (row === 2 || row === 7) {
    if (col === 1 || col === 7) return '--#--'
  }
  // Sodier/Pawn markers
  if (row === 3 || row === 6) {
    if (col === 0) return '  #--'
    if (col === 8) return '--#  '
    if (col === 2 || col === 4 || col === 6) return '--#--'
  }
  if (col === 0) return '  +--'
  if (col === 8) return '--+  '
    return '--+--'
}
