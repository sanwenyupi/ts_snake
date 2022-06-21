
class Snake {
  // 蛇头元素
  head: HTMLElement
  // 蛇身体(包括蛇头) 元素集合
  bodies: HTMLCollection
  // 蛇容器
  element: HTMLElement
  // 移动速度
  // 移动方向

  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div') as HTMLElement
    this.bodies = this.element.getElementsByTagName('div')
    console.log(this.element)
  }

  // 获取蛇的坐标(蛇头的坐标)
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }

  // 设置蛇头的坐标
  set X(val: number) {
    if(this.X === val) return

    if(val < 0 || val > 290) {
      // 撞墙
      throw new Error('蛇撞墙了')
    }

    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === val) {
      // 如果掉头了，反向
      if (val > this.X) {
        // 说明在朝左走
        val = this.X - 10
      } else {
        // 说明在朝右走
        val = this.X + 10
      }
    }

    // 移动身体
    this.moveBody()

    this.head.style.left = val + 'px'

    this.checkHeadBody()
    
  }
  set Y(val: number) {
    if(this.Y === val) return

    if(val < 0 || val > 290) {
      // 撞墙
      throw new Error('蛇撞墙了')
    }

    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === val) {
      // 如果掉头了，反向
      if (val > this.Y) {
        val = this.Y - 10
      } else {
        val = this.Y + 10
      }
    }

    this.moveBody()

    this.head.style.top = val + 'px'

    this.checkHeadBody()
  }

  // 增加身体节数
  addBody() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }

  // 蛇身体移动的方法
  moveBody() {
    // 后面的身体移动到前一个身体的位置
    for (let i=this.bodies.length - 1; i > 0; i--) {
      // 获取前一个位置
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  // 是否撞到身体
  checkHeadBody() {
    for (let i=1; i<this.bodies.length; i++) {
      let bd = (this.bodies[i] as HTMLElement)
      if(this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 游戏结束
        throw new Error('撞到自己！Game Over！')
      }
    }
  }
}



export default Snake