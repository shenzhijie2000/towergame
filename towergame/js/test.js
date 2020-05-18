// 测试canvas
var canvas = wx.createCanvas()
let { screenWidth, screenHeight } = wx.getSystemInfoSync()
canvas.width = screenWidth
canvas.height = screenHeight
console.log(`towergame_log: canvas_width:${canvas.width}, canvas_height:${canvas.height}`)

var context = canvas.getContext('2d')
context.fillStyle = 'red'
context.fillRect(0, 0, 300, 300)

context.fillStyle = '#ffffff'
context.fillText('hello, world', 100, 100)

// 测试Image
var image = wx.createImage()
image.onload = function () {
  console.log(`towergame_log: image_width:${image.width}, image_height:${image.height}`)
  context.drawImage(image, 0, 0)
}
image.src = 'assets/background.png'

// 离屏Canvas
var offScreenCanvas = wx.createCanvas()
var offContext = offScreenCanvas.getContext('2d')
offContext.fillStyle = 'green'
offContext.fillRect(0, 0, 100, 100)

context.drawImage(offScreenCanvas, 0, 0)

// 测试事件
wx.onTouchStart(function (e) {
  console.log(`towergame_log: onTouchStart:${e.touches}`)
})

wx.onTouchMove(function (e) {
  console.log(`towergame_log: onTouchMove:${e.touches}`)
})

wx.onTouchEnd(function (e) {
  console.log(`towergame_log: onTouchEnd:${e.touches}`)
})

wx.onTouchCancel(function (e) {
  console.log(`towergame_log: onTouchCancel:${e.touches}`)
})

// 全局变量
//console.log(`towergame_log: GameGlobal.setTimeout === setTimeout: ${GameGlobal.setTimeout === setTimeout}`)
//console.log(`towergame_log: GameGlobal.requestAnimationFrame === requestAnimationFrame: ${GameGlobal.requestAnimationFrame === requestAnimationFrame}`)
//console.log(`towergame_log: GameGlobal === GameGlobal.GameGlobal: ${GameGlobal === GameGlobal.GameGlobal}`)

// 测试音频
let bgm = wx.createInnerAudioContext()
bgm.autoplay = true
bgm.loop = true
bgm.src = 'assets/bgm.mp3'
bgm.play()

// 回到前台时恢复背景音乐
wx.onShow(function () {
  bgm.play()
})

wx.onAudioInterruptionEnd(function () {
  bgm.play()
})

wx.onAudioInterruptionBegin(function () {
  // 暂停游戏
})


// 文件系统
// 在本地用户文件目录下创建一个文件 a.txt，写入内容 "hello, world"
const fs = wx.getFileSystemManager()
fs.writeFileSync(`${wx.env.USER_DATA_PATH}/hello.txt`, 'hello, world', 'utf8')

// 调用接口发起授权
wx.login({
  success: function () {
    wx.getUserInfo({
      fail: function (res) {
        // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
        if (res.errMsg.indexOf('auth deny') > -1 ||     res.errMsg.indexOf('auth denied') > -1 ) {
          // 处理用户拒绝授权的情况
        }
      }
    })
  }
})

//提前发起授权
wx.authorize({
  scope: 'scope.record',
  scope: 'scope.werun',
  fail: function (res) {
    // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
    if (res.errMsg.indexOf('auth deny') > -1 ||     res.errMsg.indexOf('auth denied') > -1 ) {
      // 处理用户拒绝授权的情况
    }    
  }
})

// 获取用户授权设置
wx.getSetting({
  success: function (res) {
    var authSetting = res.authSetting
    if (authSetting['scope.record'] === true) {
      // 用户已授权，可以直接调用相关 API
      console.log(`towergame_log: 用户已授权，可以直接调用相关 API`)
    } else if (authSetting['scope.record'] === false){
      // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
      console.log(`towergame_log: 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关`)
    } else {
      // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
      console.log(`towergame_log: 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户`)
    }
  }
})


// 测试cooljs
import { Engine, Instance } from './cooljs/index'
const testgame = new Engine('canvas', true, screenWidth, screenHeight, true)
testgame.setTimeMovement("testsetTimeMovement", 5000)
testgame.getTimeMovement(
  "testsetTimeMovement",
  value,
  (value) => {
    console.log(`towergame_log: Tick:${value}`)
  }
)
//console.log(`towergame_log:${testgame}`)

console.log(`towergame_log: game begin`)