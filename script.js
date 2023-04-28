
const boxes = document.querySelectorAll('.box');
const player1 = 'X';
const player2 = 'O';
let scoreX = 0;
let scoreO = 0;

const resetBtn = document.querySelector('.reset');
let popup = document.querySelector('.pop_up');
let popupText = document.querySelector('.pop_up h2');
let statusText = document.querySelector('.status');
let scoreXText = document.querySelector('.score-x p');
let scoreOText = document.querySelector('.score-o p');
let timerText = document.getElementById('timer');

let currentPlayer = player1;
let timer = 180;
let isStarted = false;


boxes.forEach((box) => { //add an event click on each box
    box.addEventListener('click', clickBoxes , { once: true });
});

resetBtn.addEventListener('click', resetGame); //add an event click on the reset button

const patternWin = [ //all the winning patterns
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]
]

function clickBoxes(e) { //add the player's symbol on the box and check if the game is won or drawn
    if (!isStarted){
        setInterval(countdown, 1000);
        isStarted = true;
    }
    e.target.textContent = currentPlayer;

    if(checkWin()){ 
        statusText.textContent = `Player ${currentPlayer} won !`;
        addScore();
        boxes.forEach((box) => {
            box.removeEventListener('click', clickBoxes);
        });

        setTimeout(reset, 2000);
        return;
    }
    else if
    (checkDrawn()){
        statusText.textContent = `It's a draw !`;
        setTimeout(reset, 2000);
        return;
    }
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    statusMsg(statusText);
}

function statusMsg(status){ //show the current player
    status.textContent = `Turn of player ${currentPlayer}`;
}

function checkWin(){ //check if the game is won
    return patternWin.some((pattern) => {
        return pattern.every((index) => {
            return boxes[index].textContent === currentPlayer;
        });
    });
}

function checkDrawn(){ //check if the game is drawn
    return [...boxes].every((box) => {
        return box.textContent !== '';
    });
}

function addScore(){ //add a point to the winner
    if (currentPlayer === player1){
        scoreX++;
        scoreXText.textContent = scoreX;
        

    }
    else if (currentPlayer === player2){
        scoreO++;
        scoreOText.textContent = scoreO;
    }
}

function countdown(){ //timer
    let minutes = parseInt(timer / 60, 10);
    let seconds = parseInt(timer % 60, 10);
    
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    timer = timer <= 0 ? 0 : timer - 1;
    console.log(timer)
    timerText.textContent = `${minutes}:${seconds}`;
    
    endGame();
    
}

function endGame(){ //end the game when the timer is over
    console.log(timerText.textContent) 
    if (timerText.textContent === "00:00"){
        statusText.textContent = `Times up !`;
        boxes.forEach((box) => {
            box.removeEventListener('click', clickBoxes);
        });
        printWinner();
        popup.style.display = "flex";
        return;
    }
}

function printWinner(){ //print the winner in the popup
    if (scoreX > scoreO){
        popupText.textContent = "Player X won !";
    }
    else if (scoreO > scoreX){
        popupText.textContent = "Player O won !";
    }
    else if (scoreO === scoreX){
        popupText.textContent = "It's a draw !";
    }
}


function reset(){ // restart the game
    boxes.forEach((box) => {
        box.textContent = '';
        box.addEventListener('click', clickBoxes , { once: true });
    });
    currentPlayer = player1;
    statusText.textContent = `Player ${currentPlayer} begins !`;
    
}

function resetGame(){ //reset the game and the score
    reset();
    scoreX = 0;
    scoreO = 0;
    scoreXText.textContent = scoreX;
    scoreOText.textContent = scoreO;
    timer = 180;
    timerText.textContent = "03:00";
    popup.style.display = "none";
    isStarted = false;
}


