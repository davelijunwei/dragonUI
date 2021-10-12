console.log('index.js is here')
//CONNECTIONS
var ros = new ROSLIB.Ros({
  url: 'ws://localhost:9090',
})

ros.on('connection', function () {
  console.log('Connected to websocket server.')
})

ros.on('error', function (error) {
  console.log('Error connecting to websocket server: ', error)
})

ros.on('close', function () {
  console.log('Connection to websocket server closed.')
})

var listener = new ROSLIB.Topic({
  ros: ros,
  name: '/listener',
  messageType: 'std_msgs/String',
})

listener.subscribe(function (message) {
  console.log('Received message on ' + listener.name + ': ' + message.data)
  listener.unsubscribe()
})

let forward = document.getElementsByClassName('up arr')
let backward = document.getElementsByClassName('down arr')
let left = document.getElementsByClassName('left arr')
let right = document.getElementsByClassName('right arr')

//PUBLISH.Topic
var cmdVel = new ROSLIB.Topic({
  ros: ros,
  name: '/cmd_vel',
  messageType: 'geometry_msgs/Twist',
})

var twist = new ROSLIB.Message({
  linear: {
    x: 0.1,
    y: 0.2,
    z: 0.3,
  },
  angular: {
    x: -0.1,
    y: -0.2,
    z: -0.3,
  },
})
cmdVel.publish(twist)

//Subscribing Topic
var listener = new ROSLIB.Topic({
  ros: ros,
  name: '/listener',
  messageType: 'std_msgs/String',
})

listener.subscribe(function (message) {
  console.log('Received message on ' + listener.name + ': ' + message.data)
  listener.unsubscribe()
})

//Calling service
var addTwoIntsClient = new ROSLIB.Service({
  ros: ros,
  name: '/add_two_ints',
  serviceType: 'rospy_tutorials/AddTwoInts',
})

var request = new ROSLIB.ServiceRequest({
  a: 1,
  b: 2,
})

addTwoIntsClient.callService(request, function (result) {
  console.log(
    'Result for service call on ' + addTwoIntsClient.name + ': ' + result.sum
  )
})

//Getting setting param value
ros.getParams(function (params) {
  console.log(params)
})

var maxVelX = new ROSLIB.Param({
  ros: ros,
  name: 'max_vel_y',
})

maxVelX.set(0.8)
maxVelX.get(function (value) {
  console.log('MAX VAL: ' + value)
})

const moveFoward = () => {
  console.log('test forward!')
  return twist
}

const moveBackward = () => {
  console.log('test bacward!')
  return twist
}

const moveleft = () => {
  console.log('test left!')
  return twist
}

const moveRight = () => {
  console.log('test right!')
  return twist
}

// e.keyCode 37 left, 38 up, 39 right, 40 down
document.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case 37:
      alert('left')
      return moveleft()
      break
    case 38:
      moveFoward()
      alert('up')
      break
    case 39:
      alert('right')
      return moveRight()
      break
    case 40:
      alert('down')
      return moveBackward()
      break
  }
})
