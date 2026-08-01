'use strict';

let mainGame = document.querySelector('.game-block'),
    gameWrapper = document.querySelector('.game-wrap'),
    startBtn = document.querySelector('.start-btn'),
    endBtn = document.querySelector('.end-btn'),
    btnAnswers = document.querySelectorAll('.answer'),
    blocksQuestion = document.querySelectorAll('.question'),
    helpBtns = document.querySelectorAll('.hints-help'),
    winBlock = document.querySelectorAll('.wins-block'),
    helpFifty = document.querySelector('.fifty-fifty'),
    helpHall = document.querySelector('.hall-help'),
    helpFriend = document.querySelector('.call-friend'),
    helpAI = document.querySelector('.ai-help'),
    game = document.querySelector('.game')
let changeQuestion = document.getElementById('hintBox')
let extraQuestion = document.getElementById("extra")
let flagExtra = true
let endB = document.getElementById('end')
const popup = document.getElementById('rulesPopup')
const showBtn = document.getElementById('showRules')
let aiExplainBlock = document.getElementById('aiExplainBlock')
let aiExplainText = document.getElementById('aiExplainText')
let aiExplainClose = document.getElementById('aiExplainClose')
const OPENAI_API_KEY = '';
const OPENAI_MODEL = 'gpt-5.4';

showBtn.addEventListener('click', function () {
    popup.classList.add('show');
});

popup.addEventListener('click', function () {
    popup.classList.remove('show');
});

const generalMusic = new Audio('./music/end-sound.mp3');
const questionSong = new Audio('./music/questions-sound.mp3');
let count = 0
let fixed1 = new Audio('./music/8,000-question.mp3');
let incorrectSoundFlag = false

generalMusic.loop = true
window.addEventListener('click', () => {
    generalMusic.play();
}, { once: true })
endBtn.addEventListener('click', () => {
    setTimeout(() => {
        game.style.backgroundImage = ""
    }, 2000);
    questionSong.pause()
    mainGame.classList.remove('animate__backInUp')
    gameWrapper.classList.remove('animate__flipInX')
    mainGame.classList.add('animate__animated', 'animate__backOutDown')
    setTimeout(() => {
        mainGame.style.display = 'none';
        startBtn.style.display = 'block';
        startBtn.classList.remove('animate__backOutUp');
        startBtn.classList.add('animate__backInDown');
    }, 1000);
    setTimeout(() => {
        startBtn.classList.remove('animate__backInDown');
    }, 2000);

    let userWin = document.querySelector('.user-win')
    if (userWin) {
        userWin.remove();
    }
    fixed1.pause()
    generalMusic.pause()
    let activeWin = document.querySelector('.wins-active') || document.querySelector('.win-guaranteed');
    if (activeWin) {
        let spans = activeWin.querySelectorAll('span')
        spans.forEach(span => span.remove())

        let visibleAmount = activeWin.innerText.trim()
        let existingWin = document.querySelector('.user-win');
        if (existingWin) {
            existingWin.remove();
        }
        let winDiv = document.createElement('div');
        winDiv.className = 'user-win animate__animated animate__fadeIn'
        winDiv.style.cssText = 'text-align: center; font-size: 24px; color: white; margin-top:300px;'
        winDiv.innerHTML = `<p>Ձեր շահած գումարը</p><p>"${visibleAmount}"</p>`
        startBtn.insertAdjacentElement('afterend', winDiv)
        setTimeout(() => {
            winDiv.classList.replace('animate__fadeIn', 'animate__fadeOut');
            setTimeout(() => winDiv.remove(), 2000);
        }, 0);
    }
    generalMusic.play()
    showBtn.classList.remove('hide')
    getStartGame();
})
startBtn.addEventListener('click', () => {
    generalMusic.pause();
    generalMusic.currentTime = 0;
    game.style.backgroundImage = "url('./img/galaxy.jpg')";
    game.style.backgroundSize = "100%"

    startBtn.classList.add('animate__animated', 'animate__backOutUp');
    mainGame.classList.remove('animate__backOutDown');
    showBtn.classList.add('hide')
    setTimeout(() => {
        mainGame.style.display = 'block';
        mainGame.classList.add('animate__animated', 'animate__backInUp')
        startBtn.style.display = 'none';
        setTimeout(() => {
            gameWrapper.classList.add('animate__animated', 'animate__flipInX')
        }, 1000);
    }, 500);
    setTimeout(() => {
        endBtn.style.opacity = '1'
    }, 1000);
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
})
btnAnswers.forEach((btnAnswer) => {
    btnAnswer.addEventListener('click', (e) => {
        let numberQuestion = btnAnswer.parentElement.parentElement.classList[1]
        let userAnswer = e.target.innerText
        let blockAnswer = e.target;
        let blockQuestionParentElement = blockAnswer.parentElement
        blockQuestionParentElement.classList.add('block-event')
        correctnessAnswer(numberQuestion, userAnswer, blockAnswer, blockQuestionParentElement);
    })
})
btnAnswers.forEach((item) => {

    item.addEventListener('mouseover', () => {
        if (item.children[0]) {
            item.children[0].style.display = 'none';
            item.classList.remove('color-active');

        }
    });
});
let helpSound = new Audio('./music/50-50 .mp3')
helpFifty.addEventListener('click', function removeTwoBlocks() {
    helpSound.play()
    let blockActiveQuestion = getActiveBlockQuestion()
    let numRandom = Math.floor(Math.random() * blockActiveQuestion.children[1].children.length);
    let blockChildrenAnswer = blockActiveQuestion.children[1].children
    let nameQuestion = blockActiveQuestion.classList[1]
    let blockCorrectAnswer = getBlockAnswer(blockChildrenAnswer, nameQuestion);
    blockCorrectAnswer.classList.add('fifty-active')
    let blockRandom = getBlockRandom(blockChildrenAnswer, blockCorrectAnswer, numRandom);
    blockRandom.classList.add('fifty-active')
    removeBlocks(blockChildrenAnswer)
    helpFifty.classList.add('hints-help_spent', 'block-event');
})
helpHall.addEventListener('click', function getHelpHall() {
    let blockActiveQuestion = getActiveBlockQuestion()
    let blockActiveQuestionChild = blockActiveQuestion.children[1];
    checkBlockChild(blockActiveQuestionChild)
    const helpSound = new Audio('./music/hall-sound.mp3');
    helpSound.play()
    setTimeout(() => {
        helpSound.pause()
        helpSound.currentTime = 0;
    }, 10000)
    setTimeout(() => {
        for (let i = 0; i < blockActiveQuestionChild.children.length; i++) {
            let percentageRandom = Math.floor(Math.random() * 101);
            blockActiveQuestionChild.children[i].insertAdjacentHTML('afterbegin', '<div class="answer-active"></div>');
            setTimeout(() => {
                blockActiveQuestionChild.children[i].children[0].style.width = percentageRandom + '%';
                blockActiveQuestionChild.children[i].classList.add('color-active');
            });
        }
    }, 2000)
    helpHall.classList.add('hints-help_spent', 'block-event');
})
helpFriend.addEventListener('click', function getHelpFrien() {
    let blockActiveQuestion = getActiveBlockQuestion()
    let blockActiveQuestionChild = blockActiveQuestion.children[1];
    checkBlockChild(blockActiveQuestionChild)
    let numRandom = getActiveBlockLength(blockActiveQuestionChild)
    let percentageRandom = getRandom(100, 100)
    blockActiveQuestionChild.children[numRandom].insertAdjacentHTML('afterbegin', '<div class="answer-active"></div>');
    setTimeout(() => {
        blockActiveQuestionChild.children[numRandom].children[0].style.width = percentageRandom + '%';
        blockActiveQuestionChild.children[numRandom].classList.add('color-active');
    }, 3000)
    const friendCallSound = new Audio('./music/phone-sound.mp3');
    friendCallSound.currentTime = 13
    friendCallSound.play()
    setTimeout(() => {
        friendCallSound.pause();
        friendCallSound.currentTime = 0;
    }, 5000)
    helpFriend.classList.add('hints-help_spent', 'block-event');
})
helpAI.addEventListener('click', async function getHelpAI() {
    let blockActiveQuestion = getActiveBlockQuestion();
    let blockActiveQuestionChild = blockActiveQuestion.children[1];
    checkBlockChild(blockActiveQuestionChild);

    let questionText = blockActiveQuestion.children[0].innerText.trim();
    let answerOptions = [];
    for (let i = 0; i < blockActiveQuestionChild.children.length; i++) {
        answerOptions.push(blockActiveQuestionChild.children[i].innerText.trim());
    }
    helpAI.classList.add('hints-help_spent', 'block-event');

    try {
        const aiResult = await askAI(questionText, answerOptions);
        let aiIndex = answerOptions.findIndex(opt => opt === aiResult.answer);
        if (aiIndex === -1) {
            aiIndex = answerOptions.findIndex(opt => opt.startsWith(aiResult.answer.charAt(0)));
        }

        for (let i = 0; i < blockActiveQuestionChild.children.length; i++) {
            let percentage = (i === aiIndex) ? getRandom(85, 99) : getRandom(1, 30);
            blockActiveQuestionChild.children[i].insertAdjacentHTML('afterbegin', '<div class="answer-active"></div>');
            setTimeout(() => {
                blockActiveQuestionChild.children[i].children[0].style.width = percentage + '%';
                blockActiveQuestionChild.children[i].classList.add('color-active');
            }, 300);
        }

        aiExplainText.innerText = aiResult.explanation;
        aiExplainBlock.classList.add('show');
    } catch (err) {
        console.error('ԱԻ օգնության սխալ․', err);
        aiExplainText.innerText = 'ԱԻ-ից պատասխան ստանալ չհաջողվեց։';
        aiExplainBlock.classList.add('show');
    }
});

aiExplainClose.addEventListener('click', () => {
    aiExplainBlock.classList.remove('show');
})
async function askAI(questionText, answerOptions) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
    });
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
}
function getStartGame() {
    getStartQuestions();
    getStartBlockAnswers();
    getStartBlockWins();
    getStartBlocksHelp();
}
function getStartQuestions() {
    for (let i = 0; i < blocksQuestion.length; i++) {
        blocksQuestion[i].children[1].classList.remove('block-event')
        blocksQuestion[i].classList.remove('animate__fadeOut')
        if (blocksQuestion[i].classList.contains('question-active')) {
            blocksQuestion[i].classList.remove('question-active');
        }
        blocksQuestion[0].classList.add('question-active')
    }
}
function getStartBlockAnswers() {
    for (let i = 0; i < btnAnswers.length; i++) {
        if (btnAnswers[i].children[0]) {
            btnAnswers[i].children[0].remove();
        }
        btnAnswers[i].classList.remove('green-bg', 'error-answer', 'fifty-active', 'animate__zoomOut', 'color-active');
    }
}
function getStartBlockWins() {
    for (let i = 0; i < winBlock.length; i++) {
        winBlock[i].classList.remove('wins-active', 'animate__animated', 'animate__pulse', 'win-guaranteed', 'animate__tada', 'animate__heartBeat');
    }
}
function getStartBlocksHelp() {
    for (let i = 0; i < helpBtns.length; i++) {
        helpBtns[i].classList.remove('block-event', 'hints-help_spent');
    }
    aiExplainBlock.classList.remove('show');
    aiExplainText.innerText = '';
}
function correctnessAnswer(numberQuestion, userAnswer, blockAnswer, blockQuestionParentElement) {
    const correctSound = new Audio("music/correct-sound.mp3")
    const incorrectSound = new Audio("music/incorrect-sound.mp3")
    function playCorrectSound() {
        correctSound.play();
    }
    function playIncorrectSound() {
        incorrectSoundFlag = true
        fixed1.pause()
        incorrectSound.play();
    }
    if (answers[numberQuestion] === userAnswer) {

        setTimeout(() => {
            blockAnswer.classList.add('green-bg')
        }, 500)
        playCorrectSound()
        if (numberQuestion == 'question_extra') {
            setTimeout(() => {
                extraQuestion.classList.remove("question_extra")
                extraQuestion.classList.remove("question-active")
            }, 500);


        }
    } else {
        setTimeout(() => {
            blockAnswer.classList.add('error-answer')
            setTimeout(() => {
                let blockAnswer = getBlockAnswer(blockQuestionParentElement.children, numberQuestion)
                blockAnswer.classList.add('green-bg')
            }, 1000)

        }, 500)
        playIncorrectSound()
        setTimeout(() => {
            getRemoveClassName();
        }, 3500);
        setTimeout(() => {
            mainGame.classList.remove('animate__backInUp')
            gameWrapper.classList.remove('animate__flipInX')
            mainGame.classList.add('animate__animated', 'animate__backOutDown')
            setTimeout(() => {
                mainGame.style.display = 'none';
                startBtn.style.display = 'block';
                startBtn.classList.remove('animate__backOutUp');
                startBtn.classList.add('animate__backInDown');
                generalMusic.play()
                showBtn.classList.remove('hide')
            }, 1000);
            setTimeout(() => {
                startBtn.classList.remove('animate__backInDown');
                game.style.backgroundImage = '';

            }, 2000)
            let userWin = document.querySelector('.user-win')
            if (userWin) {
                userWin.remove()
            }
            getStartGame()
        }, 4500)

        return
    }
    setTimeout(() => {
        getBlockQuestion();
    }, 2000)
}
changeQuestion.addEventListener('click', function changeQuestions() {
    let blockActiveQuestion = getActiveBlockQuestion()
    blockActiveQuestion.remove()
    extraQuestion.classList.add('question-active')
    changeQuestion.classList.add('hints-help_spent', 'block-event')
})
function getRemoveClassName() {

    for (let i = 0; i < blocksQuestion.length; i++) {
        if (blocksQuestion[i].classList.contains('question-active')) {
            blocksQuestion[i].classList.add('animate__animated', 'animate__fadeOut')
            blocksQuestion[i].classList.remove('question-active')



            getBlockBefore(blocksQuestion[i]);
        }
    }
}
function getBlockBefore(block) {
    block.insertAdjacentHTML('beforebegin', `<div class="user-win animate__animated animate__fadeIn"><p>Ձեր հաղթանակը</p><p>"${getGarantWin()}"</p></div>`);//Ավելացնում ենք տարր HTML կոդում
}
function getGarantWin() {
    for (let i = 0; i < winBlock.length; i++) {
        if (winBlock[i].classList.contains('win-guaranteed')) {
            let getUserWin = winBlock[i].innerText;
            for (let symbol of getUserWin) {
                if (symbol === '.') {
                    getUserWin = '';
                    continue;
                }
                getUserWin += symbol;
            }
            return getUserWin + ' ԴՐԱՄ';
        }
    }
    return 0;
}
function getBlockAnswer(blockChildrenElem, numberQuestion) {
    for (let i = 0; i < blockChildrenElem.length; i++) {
        if (blockChildrenElem[i].innerText === answers[numberQuestion]) {
            return blockChildrenElem[i];
        }
    }
}
function getBlockQuestion() {
    for (let i = 0; i <= blocksQuestion.length; i++) {

        if (i === blocksQuestion.length - 1) {
            getWinBlock(i + 1)
            return;
        }
        if (blocksQuestion[i].classList.contains('question-active')) {
            blocksQuestion[i].classList.add('animate__fadeOut');//ավելանում է հետևյալ անունով կլասը
            blocksQuestion[i].classList.remove('question-active', 'animate__animated', 'animate__pulse')

            setTimeout(() => {
                blocksQuestion[++i].classList.add('question-active', 'animate__animated', 'animate__pulse')
                getWinBlock(i)
            }, 200)
            return
        }
    }
}
function getWinBlock(num) {
    let numBlock = (winBlock.length) - num;
    count++

    if (count >= 6) {
        changeQuestion.style.opacity = "1"
    }

    if (numBlock === 10 || numBlock === 5) {
        winBlock[numBlock + 1].classList.remove('wins-active');
        winGuaranteed(numBlock);
    }
    else if (numBlock === 14) {
        winBlock[numBlock].classList.add('wins-active', 'animate__animated', 'animate__pulse');
    }
    else if (numBlock === 0) {
        extraQuestion.style.opacity = "0"
        endB.style.opacity = '0'
        winBlock[numBlock + 1].classList.remove('wins-active');
        winBlock[numBlock].classList.add('animate__animated', 'animate__heartBeat', 'win-guaranteed');
        winGuaranteed(numBlock);
        setTimeout(() => {
            getRemoveClassName();
        }, 200);
    }
    else {
        winBlock[numBlock + 1].classList.remove('wins-active');
        winBlock[numBlock].classList.add('wins-active', 'animate__animated', 'animate__pulse');
    }
}
function winGuaranteed(numBlock) {
    if (numBlock === 10) {
        fixed1.play();
        winBlock[10].classList.add('animate__animated', 'animate__tada', 'win-guaranteed');
    }
    if (numBlock === 5) {
        winBlock[10].classList.remove('animate__animated', 'animate__tada', 'win-guaranteed');
        winBlock[5].classList.add('animate__animated', 'animate__tada', 'win-guaranteed');
    }
    if (numBlock === 0) {
        generalMusic.play()
        winBlock[5].classList.remove('animate__animated', 'animate__tada', 'win-guaranteed');
    }
}
function getActiveBlockQuestion() {
    for (let i = 0; i <= blocksQuestion.length; i++) {
        if (blocksQuestion[i].classList.contains('question-active')) {
            return blocksQuestion[i];
        }
    }
}
function getBlockRandom(blockChildrenAnswer, blockCorrectAnswer, numRandom) {
    for (let i = 0; i < blockChildrenAnswer.length; i++) {
        if (blockChildrenAnswer[numRandom] === blockCorrectAnswer) {
            if (numRandom === blockChildrenAnswer.length - 1) {
                numRandom -= 1;
            } else if (numRandom === 0) {
                numRandom += 1;
            } else {
                numRandom += 1;
            }
        }
        return blockChildrenAnswer[numRandom];
    }
}
function removeBlocks(blockChildrenAnswer) {
    for (let i = 0; i < blockChildrenAnswer.length; i++) {
        if (!blockChildrenAnswer[i].classList.contains('fifty-active')) {
            blockChildrenAnswer[i].classList.add('animate__animated', 'animate__zoomOut');
        }
    }
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function checkBlockChild(parentBlock) {
    for (let i = 0; i < parentBlock.children.length; i++) {
        if (parentBlock.children[i].children[0]) {
            parentBlock.children[i].children[0].style.width = 0;
            parentBlock.children[i].classList.remove('color-active');
            setTimeout(() => {
                parentBlock.children[i].children[0].remove();
            }, 1000);
        }
    }
}
function getActiveBlockLength(parentChild) {
    let arrActiveAnswer = [];
    for (let i = 0; i < parentChild.children.length; i++) {
        if (parentChild.children[i].classList.contains('fifty-active')) {
            arrActiveAnswer.push(i);
        }
    }
    if (arrActiveAnswer.length > 0) {
        let numIndexRandom = Math.floor(Math.random() * arrActiveAnswer.length);
        return arrActiveAnswer[numIndexRandom];
    }
    return Math.floor(Math.random() * parentChild.children.length);
}

const answers = {
    question_1: 'Ա. Երկաթ',
    question_2: 'Գ. Վեներա',
    question_3: 'Բ. Աֆրիկա',
    question_4: 'Դ. 4',
    question_5: 'Բ. Իսպաներեն',
    question_6: 'Գ. Մաշկը',
    question_7: 'Ա. Կարմիր',
    question_8: 'Բ. Ազոտ',
    question_9: 'Գ. 1969',
    question_10: 'Դ. 2',
    question_11: 'Բ. Վինսենթ վան Գոգ',
    question_12: 'Գ. Նիգերիա',
    question_13: 'Ա. 46',
    question_14: 'Դ. Ալբերտ Էյնշտեյն',
    question_15: 'Գ. Բայկալ',
    question_extra: 'Ա. Ֆրանսերեն'
}