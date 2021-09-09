// Initial data

let currentElement = document.querySelector('.colorArea .active')
let currentColor = currentElement.getAttribute('data-color')

let screen = document.querySelector('#tela')

let ctx = screen.getContext('2d')

let canDraw = false

let mouseY = 0
let mouseX = 0

//Events
document.querySelectorAll('.colorArea .color').forEach(item => {
  item.addEventListener('click', colorClickEvent)
})

screen.addEventListener('mousedown', mouseDownEvent)
screen.addEventListener('mousemove', mouseMoveEvent)
screen.addEventListener('mouseup', mouseUpEvent)

document.querySelector('.clear').addEventListener('click', clear)

//Function
function colorClickEvent(e) {
  let color = e.target.getAttribute('data-color')

  document.querySelector('.colorArea .active').classList.remove('active')
  document.querySelector(`div[data-color=${color}]`).classList.add('active')

  currentElement = document.querySelector('.colorArea .active')
  currentColor = currentElement.getAttribute('data-color')
}

function mouseDownEvent(e) {
  canDraw = true
  mouseX = e.pageX - screen.offsetLeft
  mouseY = e.pageY - screen.offsetTop
}

function mouseMoveEvent(e) {
  if (canDraw) {
    draw(e.pageX, e.pageY)
  }
}

function mouseUpEvent() {
  canDraw = false
}

function draw(x, y) {
  let pointX = x - screen.offsetLeft
  let pointY = y - screen.offsetTop

  ctx.beginPath()
  ctx.lineWidth = 5
  ctx.lineJoin = 'round'
  ctx.moveTo(mouseX, mouseY)
  ctx.lineTo(pointX, pointY)
  ctx.closePath()
  ctx.strokeStyle = currentColor
  ctx.stroke()

  mouseX = pointX
  mouseY = pointY
}

function clear() {
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}
