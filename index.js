// GAME SETTING
let currentClass = "";
const cube = document.querySelector(".cube");
const rolling = document.querySelectorAll(".rolling");
const score0 = document.getElementById("score-0");
const score1 = document.getElementById("score-1");
const current0 = document.getElementById("current-0");
const current1 = document.getElementById("current-1");
const player1 = document.getElementById("name-0");
const player2 = document.getElementById("name-1");
const playerPanel1 = document.querySelector(".player-0-panel");
const playerPanel2 = document.querySelector(".player-1-panel");
const newGame = document.querySelector(".btn-new-game");

const hold = document.querySelector(".btn-hold");

//------------------------------------------------------------

let scores, roundScore, activePlayer, gamePlaying;

// NEW GAME
newGame.addEventListener("click", init2);

function GamePlayer(score, current, player, winner, active) {
  this.score = score;
  this.current = current;
  this.player = player;
  this.winner = winner;
  this.active = active;
  this.playerClass = ".player-";
  this.panelClass = "-panel";
  this.nameId = "#name-";
  this.scoreId = "#score-";
  this.currentRandom = "current-";

  this.markSound = new Audio();
  this.victorySound = new Audio();

  this.init = function () {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    score0.textContent = this.score;
    score1.textContent = this.score;
    current0.textContent = this.current;
    current1.textContent = this.current;
    player1.textContent = p1["player"];
    player2.textContent = this.player;
    playerPanel1.classList.remove(this.winner);
    playerPanel2.classList.remove(this.winner);
    playerPanel1.classList.remove(this.active);
    playerPanel2.classList.remove(this.active);
    playerPanel1.classList.add(this.active);
  };

  this.updateScore = function () {
    document.querySelector(this.scoreId + activePlayer).textContent =
      scores[activePlayer];
  };

  this.ifPlayerWon = function () {
    document.querySelector(this.nameId + activePlayer).textContent =
      this.winner + "!";

    document
      .querySelector(this.playerClass + activePlayer + this.panelClass)
      .classList.add(this.winner);
    document
      .querySelector(this.playerClass + activePlayer + this.panelClass)
      .classList.remove(this.active);

    this.victorySound.play();
    gamePlaying = false;
  };

  this.classListActive = function () {
    playerPanel1.classList.toggle(this.active);
    current0.textContent = this.current;
    playerPanel2.classList.toggle(this.active);
    current1.textContent = this.current;
  };
}

let p1 = new GamePlayer(0, 0, "Player 1", "winner", "active");
let p2 = new GamePlayer(0, 0, "Player 2", "winner", "active");

function init2() {
  p2.init();
}

function shakingDice() {
  const audioShaking = new Audio("./sounds/shakingDice3.mp3");
  audioShaking.play();
}

init2();

// ROLL

rolling.forEach((roll) => {
  roll.addEventListener("click", () => {
    if (gamePlaying) {
      let dice = Math.floor(Math.random() * 6) + 1;

      function rollDice() {
        let randNum = dice;
        console.log(randNum);
        let showClass = "show-" + randNum;
        console.log(showClass);
        if (currentClass) {
          cube.classList.remove(currentClass);
        }
        cube.classList.add(showClass);
        currentClass = showClass;
      }

      function gameSound() {
        if (rollDice) {
          const audioDice = new Audio("./sounds/SoundEffect.mp3");
          audioDice.play();
        }
      }

      function looserSound() {
        if (dice == "1") {
          const audiolooser = new Audio("./sounds/loseSound2.mp3");
          audiolooser.play();
        }
      }

      gameSound();
      rollDice();
      looserSound();

      if (dice !== 1) {
        roundScore += dice;
        document.getElementById("current-" + activePlayer).textContent =
          roundScore;
      } else {
        nextPlayer();
      }
    }
  });
});

function nextPlayer() {
  roundScore = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  p1.classListActive();
}

// HOLD button

hold.addEventListener("click", function () {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    p1.updateScore();
    if (scores[activePlayer] >= 100) {
      p1.ifPlayerWon();
    } else {
      nextPlayer();
    }
  }
});