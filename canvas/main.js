const log = console.log.bind(console)

let board = document.getElementById('board')
let context = board.getContext('2d')

autoSetCanvasSize(board)

listenToMouse(board)

let eraserEnabled = false
eraser.onclick = function() {
  eraserEnabled = true
  actions.className = 'actions eraser'
}
brush.onclick = function() {
  eraserEnabled = false
  actions.className = 'actions '
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.fillStyle = 'black'
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

function listenToMouse(canvas) {
  let using = false
  let lastPoint = {
    x: undefined,
    y: undefined,
  }
  canvas.onmousedown = function (event) {
    let x = event.clientX
    let y = event.clientY
    using = true
    if (eraserEnabled) {
      context.clearRect(x-5, y-5, 10, 10)
    } else {
      lastPoint = {
        x,
        y,
      }
    }
  }
  canvas.onmousemove = function (event) {
    let x = event.clientX
    let y = event.clientY

    if (!using) {
      return
    }
    if (eraserEnabled) {
      context.clearRect(x-5, y-5, 10, 10)
    } else {
      newPoint = {
        x,
        y,
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }
  canvas.onmouseup = function (event) {
    using = false
  }
}

function autoSetCanvasSize(canvas) {
  setCanvasSize()
  window.onresize = function () {
    setCanvasSize()
  }
  function setCanvasSize() {
    log('resize')
    const pageWidth = document.documentElement.clientWidth
    const pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}


