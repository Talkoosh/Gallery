'use strict';

var gProjects = [
    {
        id: 'book-shop',
        name: 'Book-Shop',
        title: 'Managing Books',
        desc: "A book shop site for managing inventory",
        url: "projects/book-shop",
        publishedAt: Date.now(),
        labels: ['MVC', 'CRUDL']
    },
    {
        id: 'guess-me',
        name: 'Guess-Me',
        title: 'Guessing Game',
        desc: "A guess-who game, similar to Akinator",
        url: "projects/guess-me",
        publishedAt: Date.now(),
        labels: ['jQuery', 'Bootstrap']
    },
    {
        id: 'minesweeper',
        name: 'Minesweeper',
        title: 'Minesweeper Game',
        desc: "A fully functional Minesweeper game",
        url: "projects/minesweeper",
        publishedAt: Date.now(),
        labels: ['DOM-manipulation', 'Database']
    },
    {
        id: 'pacman',
        name: 'Pacman',
        title: 'Pacman Game',
        desc: "A minimalistic Pacman game",
        url: "projects/pacman",
        publishedAt: Date.now(),
        labels: ['DOM-manipulation', '']
    },
    {
        id: 'safe-content',
        name: 'Safe Content',
        title: 'Safe Content Site',
        desc: "A user database with admin functionality",
        url: "projects/safe-content",
        publishedAt: Date.now(),
        labels: ['Local Storage', 'MVC']
    },
    {
        id: 'touch-nums',
        name: 'Touch-Nums',
        title: 'Touch-Nums game',
        desc: "A touch-nums game",
        url: "projects/touch-nums",
        publishedAt: Date.now(),
        labels: ['DOM-manipulation', '']
    },

];

function getProjects(){
    return gProjects.slice();
}