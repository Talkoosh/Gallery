'use strict';

function onLogin() {
    const elUsername = document.querySelector('input[name="username"]');
    const elPassword = document.querySelector('input[name="password"]');
    const username = elUsername.value;
    const password = elPassword.value;
    if (getUser(username, password)) {
        window.location = "./secret-content.html";
    } else {
        alert('Wrong username / password!');
    }
}

function onSecretPageLoad() {
    var elUsername = document.querySelector('.username-heading span');
    elUsername.innerText = getUsernameForDisplay();

    var elAdminBtn = document.querySelector('.admin-btn');
    elAdminBtn.hidden = (isAdmin()) ? false : true;
}

function onLogout() {
    clearCurrUser();
    window.location = "./index.html";
}

function onAdminBtnClick() {
    window.location = "./admin.html";
}

function onAdminPageLoad() {
    var elUserCells = document.querySelector('table');
    elUserCells.innerHTML = getUsersHTML();
    console.log('render', getUsersHTML())
}