'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-restart').click(onRestartGame)
$('.btn-add-guess').click(onAddGuess);

function init() {
  createQuestsTree();
  $('.new-quest').hide();
  $('.quest').hide();
  $('.btn-restart').hide();
  $('.game-start').show();
}

function onStartGuessing() {
  $('.game-start').hide();
  renderQuest();
  $('.quest').show();
}

function renderQuest() {
  $('.quest h2').text(getCurrQuestForDisplay);
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!');
      // TODO: improve UX
      $('.btn-restart').show();
    } else {
      alert('I dont know...teach me!');
      $('.quest').hide();
      $('.new-quest').show();
    }
  } else {
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  // TODO: Get the inputs' values
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();

  // TODO: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes);
  onRestartGame();
}

function onRestartGame() {
  gLastRes = null;
  init();
}
