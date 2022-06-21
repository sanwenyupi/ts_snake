// 计分板
class ScorePanel {
  // 记录分数等级
  score: number = 0
  level: number = 1

  // 分数等级的元素
  scoreEle: HTMLElement
  levelEle: HTMLElement

  // 限制等级
  maxLevel: number
  // 升级所需分数
  upScore: number

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  changeScore() {
    this.scoreEle.innerHTML = ++this.score + ''
    // 判断分数多少
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }
  levelUp() {
    if(this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + ''
    }
  }
  reset() {

  }
}


export default ScorePanel

// const scorePanel = new ScorePanel(8,8)
// scorePanel.changeScore()