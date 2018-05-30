export default function blueRain (container, optWidth = 20, optHeight = 40, marge = 3) {
  let WIDTH = null
  let HEIGHT = null
  let tileWidth = null, tileHeight = null

  window.addEventListener('resize', () => init())

  const init = function () {
    WIDTH = container.offsetWidth
    HEIGHT = container.offsetHeight
    container.innerHTML = ' '
    let nbColumn = Math.round(WIDTH / (optWidth + (2 * marge)))
    let nbRow = Math.round(HEIGHT / (optHeight + (2 * marge)))
    tileWidth = (WIDTH / nbColumn) - (2 * marge)
    tileHeight = ((HEIGHT - marge) / nbRow) - marge // Pourquoi ? je ne sais pas non plus

    const c = new Container(container, nbColumn, nbRow)
    c.draw()
  }

  // Noc = Number of Columns & Nor = Number of Rows
  class Container {
    constructor (container, noc, nor) {
      this.elem = container
      this.columns = []
      for (let i = 0; i < noc; i++) {
        let c = new Column(nor)
        this.columns.push(c)
      }
    }

    draw () {
      this.columns.forEach((column) => {
        column.draw(this.elem)
        column.move()
      })

      window.requestAnimationFrame(this.draw.bind(this))
    }
  }

  class Column {
    constructor (numberOfTiles) {
      this.count = 0
      // Pour jouer avec la vitesse c'est ici
      this.speed = Math.random() * Math.random() * Math.random()
      this.tiles = []
      this.offset = Math.round(Math.random() * numberOfTiles)
      this.elem = document.createElement('div')
      this.elem.classList.add('column')
      for (let i = 0; i < numberOfTiles; i++) {
        let t = new Tile(document.createElement('div'))
        this.tiles.push(t)
      }
    }

    draw (container) {
      this.elem.innerHTML = ''
      container.appendChild(this.elem)
      this.tiles.forEach((tile) => {
        this.elem.appendChild(tile.elem)
      })
    }

    move () {
      this.count += this.speed
      this.tiles.forEach((tile, i) => {
        // Pour jouer avec la couleur c'est ici
        tile.elem.style.opacity = (Math.abs((this.offset + i - this.count) / this.tiles.length) % 1 + 0.1)
      })
    }
  }

  class Tile {
    constructor (e) {
      this.elem = e
      this.elem.classList.add('tile')
      this.elem.style.width = `${tileWidth}px`
      this.elem.style.height = `${tileHeight}px`
    }
  }

  init()
}
