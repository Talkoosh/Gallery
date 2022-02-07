'use strict';
const WALL = '#';
const FOOD = '.';
const POWER_FOOD = '🍖';
const CHERRY = '🍒';
const EMPTY = ' ';

var gBoard;
var gGame = {
    score: 0,
    isOn: false
};
var gCherryInterval;

function init() {
    gBoard = buildBoard();
    createGhosts(gBoard);
    createPacman(gBoard);
    printMat(gBoard, '.board-container');
    startCherryInterval();
    gGame.isOn = true;
    
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    board[1][1] = board[1][SIZE - 2] = board[SIZE - 2][1] = board[SIZE - 2][SIZE - 2] = POWER_FOOD;
    return board;
}

function startCherryInterval(){
    gCherryInterval = setInterval(function () {
        var location = getRandEmptyCell();
        addCherry(location);
    }, 15000);
}

function addCherry(location) {
    if (location) {
        //model
        gBoard[location.i][location.j] = CHERRY;

        //dom 
        renderCell(location, CHERRY);
    }
}

function getRandEmptyCell() {
    var randCells = []; 
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) randCells.push({ i: i, j: j });
        }
    }
    if(randCells.length) return randCells[Math.floor(Math.random() * randCells.length)];
    return null;
}

function updateScore(diff) {
    // model
    gGame.score += diff;

    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;

    // if (gGame.score === 60) gameOver();
}

function checkWin(){
    for(var i = 0; i < gBoard.length; i++){
        for(var j = 0; j < gBoard[0].length; j++){
            if(gBoard[i][j] === FOOD || gBoard[i][j] === POWER_FOOD){
                return false; 
            }
        }
    }
    return true;

}

function gameOver(isVictory) {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    gIntervalGhosts = null;
    gCherryInterval = null;

    var elRestartBtn = document.querySelector('button');
    var elGameOverHeading = document.querySelector('h3');

    if (isVictory) {
        elGameOverHeading.innerText = 'victory!';
        elGameOverHeading.classList.add('victory');
    } else {
        elGameOverHeading.innerText = 'Defeat!';
        elGameOverHeading.classList.add('defeat');
    }
    elGameOverHeading.style.visibility = 'visible';
    elRestartBtn.style.visibility = 'visible';
}

function restartGame(elRestartBtn) {
    var elVictoryHeading = document.querySelector('h3');

    updateScore(-gGame.score);

    elVictoryHeading.style.visibility = 'hidden';
    elVictoryHeading.classList.remove('defeat');
    elVictoryHeading.classList.remove('victory');
    elRestartBtn.style.visibility = 'hidden';

    init();
}

