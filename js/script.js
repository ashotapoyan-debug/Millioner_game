'use strict';

let meinGame = document.querySelector('.game-block'),
gameWrapper = document.querySelector('.game-wrap'),
starBtn = document.querySelector('.start-btn'),
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

