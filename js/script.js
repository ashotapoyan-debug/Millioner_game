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
}, { onse: true })

endBtn.addEventListener('click', () => {
    setTimeout(() => {
        game.style.backgroundImage = ''
    }, 2000)
    questionSong.pause()
    mainGame.classList.remove("animate__backInUp")
    mainGame.classList.remove("animate__flipInX")
    mainGame.classList.add("animate__animated", "animate__backOutDown")

    setTimeout(() => {
        mainGame.style.display = "none"
        startBtn.style.display = "block"
        startBtn.classList.remove("animate__backOutUp")
        startBtn.classList.add("animate__backInDown")
    }, 1000)
    setTimeout(() => {
        startBtn.classList.remove("animate__backInDown")
    }, 2000)
    let userWin = document.querySelector(".user-win")
    // այստեղ դեռ կվերադառնանք

    if (userWin) {
        userWin.remove()
    }
    fixed1.pause()
    generalMusic.pause()


    let activWin = document.querySelector('.wins-active') || doocument.querySelector('.win-guaranteed')
    if (activeWin) {
        let spans = activeWin.querySelector('.span')
        spans.foEach(span => span.remove()) //?

        let visibleAmount = activWin.imerText.trin()
        let exisitigWin = document.querySelector('.user-win')
        if (exisitigWin) {
            exisitigWin.remove()
        }

        let winDiv = document.createElement('div')
        winDiv.className = 'user-win animate__animated animate __fadIn'
        winDiv.style.cssText = 'text-align: center; font-size: 24px; color: white ;margin-top : 300px;';
        startBtn.insertAdjacentElement('.afterend', winDiv)
        setTimeout(() => {
            winDiv.classList.replace('animate__fadeIn', 'animate__fadeout')
            setTimeout(() => winDiv.remove(), 2000)
        }, 0)
    }


    getStartGame()



});


startBtn.addEventListener('click', () => {//Խաղի սկիզբը կոճակի վրա սեղմելիս , պետք է կատարվեն այս ֆունկցիայում ներառված գործողությւոնները
    generalMusic.pause();
    generalMusic.currentTime = 0;
    game.style.backgroundImage = "url('./img/galaxy.jpg')";
    game.style.backgroundSize = "100%"

    startBtn.classList.add('animate__animated', 'animate__backOutUp');//նախապես ունեցած կոճակի վրա ավելացնում ենք այս երկու անիմացիաները
    mainGame.classList.remove('animate__backOutDown');//mainGame-ից հեռացնում ենք այս կլաս անուն ունեցող անիմացիան
    showBtn.remove()
    setTimeout(() => {//Ցույց է տալիս թե ինչքան ժամանակ հետո պետք է կատարվի տվյալ գործողությունը
        mainGame.style.display = 'block';
        mainGame.classList.add('animate__animated', 'animate__backInUp');//mainGame-ին ավելացնումէ է նախապես ստեղծված  կլաս անվանում
        startBtn.style.display = 'none';
        setTimeout(() => {
            gameWrapper.classList.add('animate__animated', 'animate__flipInX');//gameWrapper-ին ավելացնումէ է նախապես ստեղծված  կլաս անվանում
        }, 1000);
    }, 500);
    setTimeout(() => {
        endBtn.style.opacity = '1';// տրված է առավելագույն թափանցելիություն
    }, 1000);
    //
    setTimeout(() => {
        questionSong.loop = true
        questionSong.play()
        for (let i = 0; i < btnAnswers.length; i++) {
            btnAnswers[i].addEventListener('click', () => {
                questionSong.pause()
                setTimeout(() => {
                    if (count != 5 && count != 10 && count != 15) {
                        if (incorrectSoundFlag == false && count < 5) {
                            questionSong.play()
                        }
                        if (count == 15) {
                            fixed1.pause()
                        }
                        questionSong.currentTime = 0
                    } else if (count >= 5) {
                        fixed1.loop = true
                        fixed1.play()
                        questionSong.pause()
                    }
                }, 3000);

            })
        }
    }, 2000);
});

btnAnswers.forEach((btnAnswer) => {
    btnAnswer.addEventListener('click', (e) => {
        let numberQuestion = btnAnswer.parentElement.parentElement.classList[1];
        let userAnswer = e.target.innerText
        let blockAnswer = e.target
        let blockQuestionParentElement = blockAnswer.parentElement

        blockQuestionParentElement.classList.add('block-event')
        correctnesAnsver(numberQuestion, userAnswer, blockAnswer, blockQuestionParentElement)
    })
})
btnAnswers.forEach((item) => {
    item.addEventListener('mouseover', () => {
        if (item.children[0]) {
            item.children[0].style.display = "none"
            item.classList.remove('color-active')

        }
    })
})

let helpSound = new Audio('./music/50-50.mp3')