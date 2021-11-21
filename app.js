const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#timeList')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0;

let score = 0;

const colorArray = [];

// full an array with random colors
for(let i = 0; i<100; i++) {
  let color = Math.floor((Math.random()*10000000)+1);
  if (colorArray.indexOf(color) >= 0) {
    i--;
  } else {
    colorArray.push("#" + ('000000' + color.toString(16)).slice(-6));
  }
}


startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
});



timeList.addEventListener('click', (event) => {
  if(event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-timeValue'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
      score++;
      event.target.remove()
      createRandomCircle()
    }
   
  })

function startGame() {
 
  createRandomCircle()
  setInterval(decreaseTime, 1000)
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    stopGame()
  } else {
    let current = --time;
    setTime(current)
  }
}

function setTime(value) {
  let seconds = plusZero(Math.floor(value % 60));
 
  const minutes = plusZero(Math.floor(value / 60))
  timeEl.innerHTML = `${minutes}:${seconds}`
}
function plusZero(elem) {
  if (elem < 10) {
    elem = `0${elem}`
  }
  return elem
}
function stopGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Score: <span class='primary'>${score}</span></h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  circle.classList.add('circle')
  
  const size = randomNum(10,40)
  const {width, height} = board.getBoundingClientRect()
  const y = randomNum(0, height - size)
  const x = randomNum(0, width - size)
  
  circle.style.height = `${size}px`
  circle.style.width = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = getRndmColor()
  
  board.append(circle)
}

function randomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRndmColor() {
  return colorArray[Math.round(Math.random() * colorArray.length - 1)]
}