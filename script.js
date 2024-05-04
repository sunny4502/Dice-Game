'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// const btnInstructions = document.querySelector('.btn--instructions');
// const btnCloseModal = document.querySelector('.close-modal');

// start conditions
let currentScore = 0;
let activePlayer = 0;       // 0 if active player is 0 , 1 if player 1 is active
const scores = [0 , 0];     // the global scores of both the players

let playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');


function switchPlayer(){

    document.getElementById(`current--${activePlayer}`).textContent = 0;

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');

    // remove and add karne ki jagah class ko m toggle
    // bhi use kar sakta hun if present , then remove
    // and vice versa
    // player0El.classList.toggle('player--active');
    // player1El.classList.toggle('player--active');
}


// rolling dice event
/* 
    1) generate a random number from 1 to 6
    2) display dice
    3) check for rolled 1: if true , switch to next player
    4) else increase the current score and display it
*/
btnRoll.addEventListener('click' , function(){

    if(playing === true){

        const dice = Math.trunc(Math.random() * 6 + 1);

        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        if(dice !== 1){     // add dice to current score

            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        }

        else{           // swithc to next player

            switchPlayer();
        }  
    }
});

// when the user holds the current score
// 1) add the currentscore to the active user's global score
// 2) check if the score if >= 100 , then this player wins
// 3) else switch the user 
btnHold.addEventListener('click' , function(){

    if(playing === true){

        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if(scores[activePlayer] >= 100){

            playing = false;

            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }

        else{           // swithc the player

            switchPlayer();
        }
    }
});


// playing the new game
// 1) remove the winner class or if there is new winner yet , then remove the active class
// 2) , make player 1 as active player 
// 3) set all the score back to 0
// 4) hide the dice and make playing equal to true
btnNew.addEventListener('click' , function(){

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    diceEl.classList.add('hidden');

    player0El.classList.add('player--active');

    activePlayer = 0;

    scores[0] = 0 , scores[1] = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    currentScore = 0;
    playing = true;
});


// // and this is when we press the instructions button
// btnInstructions.addEventListener('click' , function(){

//     document.querySelector('.modal').classList.remove('hidden');
// })

// btnCloseModal.addEventListener('click' , function(){

//     document.querySelector('.modal').classList.add('hidden');
// });