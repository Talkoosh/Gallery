'use strict';

var gProjects = [
    {
        id: 'bookShop',
        name: 'Book-Shop',
        title: 'Managing Books',
        desc: "A book shop site for managing inventory",
        url: "./projects/book-shop/index.html",
        publishedAt: Date.now(),
        labels: ['MVC', 'CRUDL']
    },
    {
        id: 'guessMe',
        name: 'Guess-Me',
        title: 'Guessing Game',
        desc: "A guess-who game, similar to Akinator",
        url: "./projects/guess-me/index.html",
        publishedAt: Date.now(),
        labels: ['jQuery', 'Bootstrap']
    },
    {
        id: 'minesweeper',
        name: 'Minesweeper',
        title: 'Minesweeper Game',
        desc: "A fully functional Minesweeper game",
        url: "./projects/minesweeper/index.html",
        publishedAt: Date.now(),
        labels: ['DOM-manipulation', 'Database']
    },
    {
        id: 'pacman',
        name: 'Pacman',
        title: 'Pacman Game',
        desc: "A minimalistic Pacman game",
        url: "./projects/pacman/index.html",
        publishedAt: Date.now(),
        labels: ['DOM-manipulation', '']
    },
    {
        id: 'safeContent',
        name: 'Safe Content',
        title: 'Safe Content Site',
        desc: "A user database with admin functionality",
        url: "./projects/safe-content/index.html",
        publishedAt: Date.now(),
        labels: ['Local Storage', 'MVC']
    },
    {
        id: 'touchNums',
        name: 'Touch-Nums',
        title: 'Touch-Nums game',
        desc: "A touch-nums game",
        url: "./projects/touch-nums/index.html",
        publishedAt: Date.now(),
        labels: ['DOM-manipulation', '']
    },

];

function getProjects(){
    return gProjects.slice();
}

function getProject(id){
    return gProjects.find(function(project){
        return project.id === id;
    })
}