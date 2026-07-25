'use strict';

let mainGame = document.querySelector('.game-block'),
gameWrapper = document.querySelector('.game-wrap'),
startBtn = document.querySelector('.start-btn'),
endBtn = document.querySelector('.end-btn'),
btnAnswers = document.querySelectorAll('.answer'),
blockQuestion = document.querySelectorAll('.question'),
helpBtns = document.querySelectorAll('.hints-help'),
winBlock = document.querySelectorAll('.wins-block'),
helpFiffy = document.querySelector('.fifty-fifty'),
helpHall = document.querySelector('.help-help'),
helpFriend = document.querySelector('.call-friend'),
helpAI = document.querySelector('.ai-help'),
game = document.querySelector('.game')
////////////////////=========================>

let changeQuestion = document.getElementById('hitBox')
let extraQuestion = document.getElementById('extra')
let flagExtra = true

let endB = document.getElementById('end')
const popup = document.getElementById('rulesPopup')
const showBtn = document.getElementById('showRules')

let aiExplainBlock = document.getElementById('aiExplainBlock')
let aiExplainText = document.getElementById('aiExplainText')
let aiExplainClose = document.getElementById('aiExplainClose')

const OPEN_AI_KEY = ''
const OPENAI_MODEL = ''

showBtn.addEventListener('click', () => {
    popup.classList.add("show")
})

popup.addEventListener('click', () => {
    popup.classList.remove('show')
})

let generalMusic = new Audio('./music/end-sound.mp3')
let questionSong = new Audio('./music/questions-sound.mp3')
let count = 0

let fixed1 = new Audio('./music/8,000-question.mp3')
let incorectSoundFlag = false

generalMusic.loop = true

window.addEventListener('click', () => {
    generalMusic.play()
}, {onse: true })

endBtn.addEventListener('click', () => {
    setTimeout(() => {
        game.style.backgroundImage = ''
    }, 2000)
    questionSong.pause()
    mainGame.classList.remove("animate__backInUp")
    mainGame.classList.remove("animate__flipInX")
    mainGame.classList.add("animate__animated","animate__backOutDown")

    setTimeout(() =>{
        mainGame.style.display = "none"
        starBtn.style.display = "block"
        starBtn.classList.remove("animate__backOutUp")
        starBtn.classList.add("animate__backInDown")
    },1000)
    setTimeout(()=>{
        starBtn.classList.remove("animate__backInDown")
    },2000);

    let userWin = document.querySelector(".user-win")

    //այստեղ դեռ կվերադառնանք
})

startBtn.addEventListener("click", () => {
    generalMusic.pause()
    generalMusic.currentTime = 0
    game.style.backgroundImage = 'url("./img/galaxy.jpg")'
    game.style.backgroundSize = "100%"
    startBtn.classList.add("animate__animated", "animate__backOutUp")
    startBtn.classList.remove("animate__backOutDown")
    showBtn.remove()
})