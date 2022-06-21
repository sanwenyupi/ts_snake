// food类

class Food {
  // 定义一个属性表示Food对应的元素
  element: HTMLElement;

  // 游戏区域的宽高
  
  constructor() {
    // ！表示这个元素不为null，一定存在
    this.element = document.getElementById('food')!
  }

  // 获取食物x轴坐标的方法
  get X() {
    return this.element.offsetLeft
  }

  // 获取y轴
  get Y() {
    return this.element.offsetTop
  }

  // 随机生成食物位置
  changePos() {
    // x,y: [0,290] offset: 10px cuz蛇一次移动10px
    let left = Math.round(Math.random() * 29) * 10 //[0,29]的整数 * 10 => [0,290] 的10的倍数
    let top = Math.round(Math.random() * 29) * 10 //[0,29]的整数 * 10 => [0,290] 的10的倍数
  
    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }
}


export default Food

// const food = new Food()
// // console.log(food.X, food.Y)
// food.changePos()
