let forward = document.getElementsByClassName('up arr')
let backward = document.getElementsByClassName('down arr')
let left = document.getElementsByClassName('left arr')
let right = document.getElementsByClassName('right arr')

//e.keyCode 37 left, 38 up, 39 right, 40 down

document.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case 37:
      alert('left')
      break
    case 38:
      alert('up')
      break
    case 39:
      alert('right')
      break
    case 40:
      alert('down')
      break
  }
})
