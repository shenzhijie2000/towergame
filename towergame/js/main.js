import './src/index'

let { screenWidth, screenHeight } = wx.getSystemInfoSync()
const option = {
  width: screenWidth,
  height: screenHeight,
  canvasId: 'canvas',
  soundOn: true,
}

var game = TowerGame(option)
game.load(function () {
  game.playBgm()
  game.init()
})
game.start()
