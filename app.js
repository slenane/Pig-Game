/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, lastRoll, gamePlaying;

let winningScore = 100;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if(gamePlaying) {
        //Reset message
        document.querySelector(".unlucky-roll").textContent = ""
        document.querySelector(".unlucky-roll").textContent = ""

        // 1. Random number
        let dice = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        let diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice +".png"

        let diceDOM2 = document.querySelector(".dice2");
        diceDOM2.style.display = "block";
        diceDOM2.src = "dice-" + dice2 +".png"

        // 3. Clear score if 6 is rolled twice in a row
        if (dice === 6 && dice2 === 6) {
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
            document.querySelector(".unlucky-roll").innerHTML = "<p>Double six</p> <br> <p>start again!</p>"
            nextPlayer();
        }

        // 4. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1 && dice2 !== 1) {
            //add score
            let diceRoll = dice + dice2;
            roundScore += diceRoll;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            //next player
            document.querySelector(".unlucky-roll").innerHTML = "<p>You rolled a one</p> <br> <p>next player!</p>"
            nextPlayer();
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        //add current score to player's global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!"
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".dice2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
     //next player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     roundScore = 0;

     //Reset scores
     document.getElementById("current-0").textContent = "0";
     document.getElementById("current-1").textContent = "0";

     //Toggle active class
     document.querySelector(".player-0-panel").classList.toggle("active");
     document.querySelector(".player-1-panel").classList.toggle("active");

     //Remove dice until next player rolls
     document.querySelector(".dice").style.display = "none";
     document.querySelector(".dice2").style.display = "none";
}

document.querySelector(".submit").addEventListener("click", function() {
    winningScore = document.querySelector("#score-update").value;
    document.querySelector(".current-winning-score").textContent = winningScore;
    init();
});


document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");
}