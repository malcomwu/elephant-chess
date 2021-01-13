import el from 'el'

export default function guiGrid(grid, style = 'detailed') {
  if (style === 'detailed') {
    console.log(grid)

    // The implementation is below is for demo but it is not correct.
    const pieceStyle = {
      style: `
        border: 1px solid black;
        padding: 5px;
        width: 75px;
        display:inline-block;
        text-align: center;
      `
    }
    return el('div', grid.value.map(row => {
      return el('div', row.map(column => {
        if (!column) return el('div', { ...pieceStyle }, '.')
        return el('div', { ...pieceStyle }, column.detailed)
      }))
    }))
  }

  if (style = 'pretty') {
    return el('div')
  }

  if (style = 'recognition') {
    return el('div')
  }

  throw new Error(`Unsupported style: ${style}`)
}
