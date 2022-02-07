'use strict';

var gUsers = _createUsers();

function _createUser(username, password, isAdmin = false) {
    return {
        id: _makeId(),
        username: username,
        password: password,
        lastLoginTime: 0,
        isAdmin: isAdmin
    }
}

function _createUsers() {
    var users = [];
    users.push(_createUser('tal', '209323492', true));
    users.push(_createUser('guy', 'mhaifa'));
    users.push(_createUser('roi', 'mtelaviv'));
    _saveUsers(users);
    return users;
}

function _saveUsers(users) {
    saveToStorage('users', users);
}

function getUser(username, password) {
    const user = gUsers.find(function (user) {
        return (user.username === username &&
            user.password === password);
    })
    if (user) {
        _updateCurrUser(user);
        _updateLoginTime(user);
        return user;
    }
    return null;
}

function _updateCurrUser(user) {
    saveToStorage('currUser', user);
}

function clearCurrUser() {
    saveToStorage('currUser', null);
}

function _updateLoginTime(currUser) {
    const userIdx = gUsers.findIndex(function (user) {
        return user.id === currUser.id;
    })
    gUsers[userIdx].lastLoginTime = Date.now();
    console.log(gUsers[userIdx]);
    _saveUsers(gUsers);
}

function getUsernameForDisplay() {
    return loadFromStorage('currUser').username;
}

function isAdmin() {
    var user = loadFromStorage('currUser');
    return user.isAdmin;
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getUsersHTML() {
    var strHTMLs = '<tr><th>Username</th><th>Password</th><th>last Login Time</th><th>Is Admin</th></tr>';
    const users = loadFromStorage('users');
    console.log(users);

    users.forEach(function (user) {
        strHTMLs += `<tr><td>${user.username}</td><td>${user.password}</td><td>${user.lastLoginTime}</td><td>${user.isAdmin}</td></tr>`
    });
    return strHTMLs;
}