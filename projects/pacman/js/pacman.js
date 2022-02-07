'use strict';
const PACMAN = '😷';

var gPowerFoodTimer;

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
    // return if cannot move
    if (nextCellContent === WALL) return;

    if (nextCellContent === POWER_FOOD && !gPacman.isSuper) powerFoodEaten();
    else if (nextCellContent === POWER_FOOD && gPacman.isSuper) {
        return;
    }
    if (nextCellContent === GHOST) {
        if (!gPacman.isSuper) {
            gameOver();
            return;
        }
        var ghost = getGhost(nextLocation);
        if (ghost.currCellContent === FOOD) {
            updateScore(1);
            ghost.currCellContent = EMPTY;
        }
        killGhost(ghost);
    }
    
    if (nextCellContent === FOOD) updateScore(1);
    if(nextCellContent === CHERRY) updateScore(10);
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, PACMAN);

    if(checkWin()) gameOver(true);

}


function powerFoodEaten() {
    gPacman.isSuper = true;
    updateScore(1);
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i];
        renderCell(currGhost.location, getGhostHTML(currGhost));
    }

    gPowerFoodTimer = setTimeout(powerFoodExpired, 5000);

}

function powerFoodExpired() {
    gPacman.isSuper = false;
    reviveGhosts();
}

function getNextLocation(ev) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };
    // figure out nextLocation
    switch (ev.key) {
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
    }

    return nextLocation;
}