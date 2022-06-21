
import Snake from "./Snake"
import Food from "./Food"
import ScorePanel from "./ScorePanel"

// 控制其他所有类

class GameControl {
  // 三个类
  snake: Snake
  food: Food
  scorePanel: ScorePanel

  // 存储蛇的移动方向
  direction: string = 'ArrowRight'

  // 游戏结束没，蛇是否碰撞，是否活着
  isLive: boolean = true

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel(10, 1)

    this.init()
  }

  // 游戏开始
  init() {
    // 绑定按键按下的事件
    document.addEventListener('keydown', this.keydownHandler)

    this.snakeMove()
  }
  // 键盘按下的响应函数
  keydownHandler = (e: KeyboardEvent) => {
    // function中的this已经是document咯,使用箭头函数,定义是的this即GC实例对象,或者在上方用bind指定this
    // console.log(this);

    // 判断key是否为方向键
    this.direction = e.key
  }
  // 控制蛇的移动
  snakeMove = () => {
    let x = this.snake.X
    let y = this.snake.Y

    switch (this.direction) {
      case 'ArrowLeft':
        x -= 10
        break;
      case 'ArrowRight':
        x += 10
        break;
      case 'ArrowUp':
        y -= 10
        break;
      case 'ArrowDown':
        y += 10
        break;
    }


    // 检查是否吃到食物了,传入的是移动后的xy坐标
    this.checkEat(x, y)

    // 修改蛇的xy
    try {
      this.snake.X = x
      this.snake.Y = y
    } catch (e: any) {
      // 出异常时，进入catch，蛇死了
      alert(e.message + '! Game Over!')
      this.isLive = false
    }


    this.isLive && setTimeout(this.snakeMove.bind(this), 250 - (this.scorePanel.level - 1) * 25);
  }

  // 定义一个方法，用来检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.changePos()
      this.scorePanel.changeScore()
      // 身体加一节
      this.snake.addBody()
    }

  }

}


export default GameControl