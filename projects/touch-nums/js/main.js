'use strict';

var gNums;
var gCurrCorrectNum;
var gIsFirstClick;
var gTimerStart;
var gTimerInterval;
var gPrevBoardSize;

function init(boardSize) {
    gPrevBoardSize = boardSize;
    gIsFirstClick = true;
    gCurrCorrectNum = 1;
    gNums = createNums(boardSize);
    renderBoard(gNums);
}

function showTimer() {
    var currTime = (Date.now() - gTimerStart) / 1000;

    var elTimer = document.querySelector('.timer');
    elTimer.innerText = `Timer: ${currTime}`;
}

function gameStart() {
    gIsFirstClick = false;

    gTimerStart = Date.now();
    gTimerInterval = setInterval(showTimer, 1);

    var elDiffButtonBoard = document.querySelector('.difficulty-buttons');
    elDiffButtonBoard.classList.add('hide');

}

function resetGame(elBtn) {
    elBtn.classList.add('hide');

    var elTimer = document.querySelector('.timer');
    elTimer.innerText = 'Timer:';

    var elDiffButtonBoard = document.querySelector('.difficulty-buttons');
    elDiffButtonBoard.classList.remove('hide');

    init(gPrevBoardSize);
}

function gameFinished() {
    clearInterval(gTimerInterval);

    var elBtn = document.querySelector('button');
    elBtn.classList.remove('hide');
}

function correctNumClicked(clickedNum) {
    if (gIsFirstClick) {
        gameStart();
    }

    //update model
    var numIdx = gNums.indexOf(clickedNum)
    gCurrCorrectNum++;

    //update DOM
    var elCell = document.querySelector(`[data-idx="${numIdx}"]`);
    elCell.classList.add('pressed-cell');
}

function cellClicked(clickedNum) {
    if (clickedNum === gCurrCorrectNum) {
        correctNumClicked(clickedNum);
    }

    if (gCurrCorrectNum === gNums.length + 1) {
        gameFinished();
    }

}

function renderBoard(nums) {
    var strHTML = '<tr>';
    var rowLength = Math.sqrt(nums.length);
    var rowCounter = 1;

    for (var i = 0; i < nums.length; i++) {
        if (i === rowCounter * rowLength) {
            strHTML += '</tr><tr>';
            rowCounter++;
        }
        strHTML += `<td class="cell" data-idx="${i}" 
            onclick="cellClicked(${nums[i]})">${nums[i]}</td>`;
    }
    strHTML += '</tr>'

    var elBoard = document.querySelector('table');
    elBoard.innerHTML = strHTML;
}

function createNums(rowAmount) {
    var nums = [];
    for (var i = 0; i < rowAmount ** 2; i++) {
        nums[i] = i + 1;
    }
    return shuffleNums(nums);
}

function shuffleNums(nums) {

    for (var i = nums.length - 1; i >= 0; i--) {
        var randIdx = getRandomInt(0, nums.length - 1);
        var keep = nums[i];
        nums[i] = nums[randIdx];
        nums[randIdx] = keep;
    }
    return nums;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}