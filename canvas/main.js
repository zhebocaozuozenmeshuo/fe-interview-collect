const log = console.log.bind(console)

let board = document.getElementById('board')
let context = board.getContext('2d')

autoSetCanvasSize(board)

listenToUser(board)

let eraserEnabled = false
eraser.onclick = function () {
  eraserEnabled = true
  actions.className = 'actions eraser'
}
brush.onclick = function () {
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

function listenToUser(canvas) {
  let using = false
  let lastPoint = {
    x: undefined,
    y: undefined,
  }
  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    log('这是一个移动设备')
    canvas.ontouchstart = function (event) {
      log('摸上')
      let x = event.touches[0].clientX
      let y = event.touches[0].clientY
      // using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          x,
          y,
        }
      }
    }
    canvas.ontouchmove = function (event) {
      log('摸动')
      let x = event.touches[0].clientX
      let y = event.touches[0].clientY

      // if (!using) {
      //   return
      // }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        newPoint = {
          x,
          y,
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function (event) {
      log('摸完')
      // using = false
    }
  } else {
    canvas.onmousedown = function (event) {
      let x = event.clientX
      let y = event.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
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
        context.clearRect(x - 5, y - 5, 10, 10)
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


