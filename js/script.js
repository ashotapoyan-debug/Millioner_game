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

const OPENAI_API_KEY = ''
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

helpFiffy.addEventListener('click', function removeTwoBlocks() {
    helpSound.play()
    let blockActiveQuestion = getActiveBlockQuestion()
    let numRandom = Math.floor(Math.random() * blockActiveQuestion.children[1].length)
    let blockChildrenAnsver = blockActiveQuestion.children[1].children
    let nameQuestion = blockActiveQuestion.classList[1]
    let blockCorrectAnsver = getBlockAnsver(blockChildrenAnsver, nameQuestion)
    blockCorrectAnsver.classList.add('fifty-active')
    let blockRandom = getBlockRandom(blockChildrenAnsver, blockCorrectAnsver, numRandom)
    blockRandom.classList.add('fifty-active')
    removeBlocks(blockChildrenAnsver)
    helpFiffy.classList.add('hints-help_spend', 'block-event')
})

helpHall.addEventListener('click', function getHelpHall() {
    // Կանչում ենք ֆունկցիա, որը վերադարձնում է տվյալ պահին ակտիվ հարցի բլոկը
    let blockActiveQuestion = getActiveBlockQuestion();
    // blockActiveQuestionChild - պահպանում ենք պատասխաններով օբյեկտը
    let blockActiveQuestionChild = blockActiveQuestion.children[1];
    checkBlockChild(blockActiveQuestionChild);
    // Կանչում ենք ձայնը
    const helpSound = new Audio('./music/hall-sound.mp3');
    helpSound.play(); // Երաժշտությունը սկսվում է անմիջապես
    // Երաժշտությունը կանգնում է 5 վայրկյան հետո
    setTimeout(() => {
        helpSound.pause(); // Երաժշտությունը կանգնում է
        helpSound.currentTime = 0;
    }, 10000); // 5000 միլիսեկունդ = 5 վայրկյան
    // 5 վայրկյան սպասելուց հետո սկսում ենք փոխել պատասխանները
    setTimeout(() => {
        // Կանչում ենք ցիկլ, որը ուսումնասիրում է բոլոր պատասխանները
        for (let i = 0; i < blockActiveQuestionChild.children.length; i++) {
            // percentageRandom - գեներացնում ենք 0-100 միջակայքում պատահական թիվ
            let percentageRandom = Math.floor(Math.random() * 101);
            blockActiveQuestionChild.children[i].insertAdjacentHTML('afterbegin', '<div class="answer-active"></div>');
            setTimeout(() => {
                blockActiveQuestionChild.children[i].children[0].style.width = percentageRandom + '%';
                blockActiveQuestionChild.children[i].classList.add('color-active');
            });
        }
    }, 2000); // 5 վայրկյան ուշացում
    // Բլոկի վրա արգելք ենք դնում և անջատում ենք իրադարձություն լսողը
    helpHall.classList.add('hints-help_spent', 'block-event');
});

helpFriend.addEventListener('click', function getHelpFrien() {
    // այս ֆունկցիայի միջոցով գտնում և պահպանում ենք այն հարցի բլոկը , որը այդ պահին տեսնում է օգտատերը
    let blockActiveQuestion = getActiveBlockQuestion();
    // blockActiveQuestionChild - պահում է պատասխաններով օբյեկտը
    let blockActiveQuestionChild = blockActiveQuestion.children[1];
    checkBlockChild(blockActiveQuestionChild);
    // Ֆունկցիան վերադարձնում է 0-3 պատահական թիվ և ստուգում բլոների քանակը
    let numRandom = getActiveBlockLength(blockActiveQuestionChild);
    // Վերադարձնում է պատահական թիվ մինիմումից 100
    let percentageRandom = getRandom(100, 100);
    // ավելացնում է գրաֆիկական փոփոխություններ պատահականորեն ընտրված բլոկի մեջ:
    blockActiveQuestionChild.children[numRandom].insertAdjacentHTML('afterbegin', '<div class="answer-active"></div>');
    setTimeout(() => {
        blockActiveQuestionChild.children[numRandom].children[0].style.width = percentageRandom + '%';
        blockActiveQuestionChild.children[numRandom].classList.add('color-active');
    }, 3000);
    // Երաժշտություն՝ սկսելով 13-րդ վայրկյանից և տևելով 5 վայրկյան
    const friendCallSound = new Audio('./music/phone-sound.mp3');
    friendCallSound.currentTime = 13; // Սկսում է 13-րդ վայրկյանից
    friendCallSound.play();
    // 5 վայրկյան անց կանգնեցնում ենք
    setTimeout(() => {
        friendCallSound.pause();
        friendCallSound.currentTime = 0;
    }, 5000);
    // Բլոկի վրա արգելք ենք դնում և անջատում ենք իրադարձություն լսողը
    helpFriend.classList.add('hints-help_spent', 'block-event');
});

helpAI.addEventListener('click', async function getHelpAI() {
    let blockActiveQuestion = getActiveBlockQuestion()
    let blockActiveQuestionChild = blockActiveQuestion.children[1]
    checkBlockChild(blockActiveQuestionChild)
    let questionText = []
    for (let i = 0; i < blockActiveQuestionChild.children; i++) {
        answerOptions.push(blockActiveQuestionChild.children[i].innerText.trim())
    }
    helpAI.classList.add('hints-help_spent', 'block-event')
    try {
        const aiResult = await askAI(questionText, answerOptions)
        let aiIndex = answerOptions.findIndex(opt => opt == aiResult.answer)
        if (aiIndex === -1) {
            let aiIndex = answerOptions.findIndex(opt => opt.startsWith(aiResult.answer.charAt(0)))
        }
        for (let i = 0; i < blockActiveQuestionChild.children.length; i++) {
            let percentage = (i === aiIndex) ? getRandom(85, 99) : getRandom(1, 30)
            blockActiveQuestionChild.children[i].insertAdjacentElement('afterbegin', '<div class="ansver-active"></div>')
            setTimeout(() => {
                blockActiveQuestionChild.children[i].children[0].style.width = percentage + '%';
                blockActiveQuestionChild.children[i].classList.add('color-active');
            }, 300);
        }
        aiExplainText.innerText = aiResult.explanation
        aiExplainBlock.classList.add('swow')
    } catch (err) {
        console.error('ԱԲ օգնության սխալ', err)
        aiExplainText.innerText = 'ԱԲ-ից պատասխան ստանալ չհաջողվեց'
        aiExplainBlock.classList.add('swow')
    }
})

aiExplainClose.addEventListener('click', () => {
    aiExplainBlock.classList.remove('show')
})

async function askAI(questionText, answerOptions) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-type': 'application/josn',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: OPENAI_MODEL,
            temperature: 0,
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: 'Դու օգնում ես «Ո՞վ է ուզում դառնալ միլիոնատեր» խաղում։ ' +
                        'Ընտրիր ճիշտ պատասխանը տրված տարբերակներից և բացատրիր կարճ (2-3 նախադասությամբ)՝ ինչու է այն ճիշտ։ ' +
                        'Պատասխանիր ԲԱՑԱՌԱՊԵՍ JSON ձևաչափով՝ {"answer": "<տարբերակի ամբողջական տեքստը>", "explanation": "<բացատրություն>"}, ոչինչ ավելին։'
                },
                {
                    role: 'user',
                    content: `Հարց: ${questionText}\nՏարբերակներ:\n${answerOptions.join('\n')}`
                }
            ]
        })
    })

}

function getStartGame() {
    getStartQusestion()
    getStartBlockAnswers()
    getStartBlockWins()
    getStartBlocksHelp()
}

function getStartQusestion() {
    for (let i = 0; i < blockQuestion.length; i++) {
        blockQuestion[i].children[1].classList.remove('block-event')
        blockQuestion[i].classList.remove('animate__fadeOut')
        if (blockQuestion[i].classList.contains('question-active')) {
            blockQuestion[i].classList.remove('question-active')
        }
        blockQuestion[0].classList.add('question-active')
    }
}

function getStartBlockAnswers() {
    for (let i = 0; i < btnAnswers.length; i++) {
        if (btnAnswers[i].children[0]) {
            btnAnswers[i].children[0].remove()
        }
        btnAnswers[i].classList.remove('green-bg', 'error-answer', 'fifty-active','animate__zoomOut', 'color-active')
    }
}

function getStartBlockAnswers() {
    for (let i = 0; i < winBlock.length; i++) {
        winBlock[i].classList.remove('wins-active','animate__animated','animate__pulse','win-guaranteed','animate__tada','animate__heartBeat')        
    }
}
