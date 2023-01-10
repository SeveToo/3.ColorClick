const app__wrapper = document.querySelector('.app__wrapper')
const app__boxes = document.querySelectorAll('.app__box')
const app__timer = document.querySelector('.app__timer')
const app__monit = document.querySelector('.app__monit')
const lives = 5
const initialColor = '#76ec67'
let selectedColor = ''
let points = 0

const addDataAttribute = () => {
  app__boxes.forEach((el, i) => {
    el.setAttribute('data-color', i)
    el.setAttribute('lives', lives)
    el.textContent = lives
  })
}

addDataAttribute()

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

// prettier-ignore
const colors = ['001219', '005f73', '0a9396', '94d2bd', 'e9d8a6',     
                'ee9b00', 'ca6702', 'bb3e03', 'ae2012', '9b2226',     
                '0077b6', '0096c7', '48cae4', 'ade8f4', 'caf0f8']

const hexToRGB = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r}, ${g}, ${b})`
}

const start = () => {
  const randomizeColors = () => {
    const randomizedColorPallete = []
    for (let i = 0; i < app__boxes.length - points; i++) {
      randomizedColorPallete.push(colors[rand(0, colors.length - 1)])
    }

    let colorNr = 0
    for (let i = 0; i < app__boxes.length; i++) {
      const el = app__boxes[i]
      if (el.getAttribute('lives') > 0) {
        // console.log(i, randomizedColorPallete[colorNr])
        el.style.backgroundColor = `#${randomizedColorPallete[colorNr]}`
        colorNr++
      }
    }

    selectedColor = `#${
      randomizedColorPallete[rand(0, randomizedColorPallete.length - 1)]
    }`
    app__wrapper.style.borderColor = `${selectedColor}`
  }
  randomizeColors()
}

const beforeGame = (() =>
  (app__monit.textContent = 'Click something board to start the game.'))()

const setAppMonit = (text = '') => (app__monit.textContent = text)

let timer
const startTimer = () => {
  let seconds = 0
  let miliseconds = 0
  clearInterval(timer)
  timer = setInterval(() => {
    miliseconds++
    if (miliseconds === 10) {
      miliseconds = 0
      seconds++
    }
    app__timer.textContent = `${seconds}.${miliseconds}s`
  }, 100)
}

let isStarted = false

const game = () => {
  isStarted = true
  setAppMonit()
  startTimer()
  start()
}

app__wrapper.addEventListener('click', () => {
  if (!isStarted) game()
})

checkIsMachColors = (slectedByUser, randomColor) =>
  slectedByUser === randomColor ? true : false

const addLive = (el) => {
  const lives = el.getAttribute('lives')
  el.setAttribute('lives', +lives + 1)
  el.textContent = +lives + 1
}

const win = () => {
  clearInterval(timer)
  setAppMonit('You win!')

  setTimeout(() => {
    setAppMonit('Click something board to start the game.')
    isStarted = false
    points = 0
    app__timer.textContent = '0.0s'

    app__boxes.forEach((el) => {
      el.setAttribute('lives', lives)
      el.textContent = lives
      el.style.backgroundColor = initialColor
    })
  }, 5000)
}

const removeElement = (el) => {
  el.textContent = ''
  el.style.backgroundColor = 'transparent'

  points++
  setAppMonit(`You have ${points} points`)
  if (points === 9) win()
}

const removeLive = (el) => {
  let lives = el.getAttribute('lives')
  if (lives > 0) {
    lives--
    el.setAttribute('lives', lives)
    el.textContent = lives
  }
  if (lives <= 0) {
    removeElement(el)
  }
}

const toggleClass = () => {
  app__wrapper.classList.toggle('app__wrapper--new')

  setTimeout(() => {
    app__wrapper.classList.toggle('app__wrapper--new')
  }, 300)
}

const pickColors = (e) => {
  const thisBg = e.style.backgroundColor
  const currentColor = hexToRGB(selectedColor)
  checkIsMachColors(thisBg, currentColor) ? removeLive(e) : addLive(e)

  start()
  toggleClass()
}

const checkIsAlive = (el) => {
  if (el.getAttribute('lives') <= '0') {
    removeElement(el)
  }
}

app__boxes.forEach((el) => {
  el.addEventListener('click', (e) => {
    if (!(el.getAttribute('lives') <= '0'))
      if (isStarted) {
        pickColors(el)
      }
  })
})

const chosenColor = (e) => {
  if (!(e.getAttribute('lives') <= '0'))
    if (isStarted) {
      pickColors(e)
    }
}

// Keyboard events
document.addEventListener('keydown', (e) => {
  if (!isStarted) {
    game()
  } else
    switch (e.key) {
      case '7':
        chosenColor(app__boxes[0])
        break
      case '8':
        chosenColor(app__boxes[1])
        break
      case '9':
        chosenColor(app__boxes[2])
        break
      case '4':
        chosenColor(app__boxes[3])
        break
      case '5':
        chosenColor(app__boxes[4])
        break
      case '6':
        chosenColor(app__boxes[5])
        break
      case '1':
        chosenColor(app__boxes[6])
        break
      case '2':
        chosenColor(app__boxes[7])
        break
      case '3':
        chosenColor(app__boxes[8])

      default:
        break
    }
})
// start()
// clearInterval(start)
