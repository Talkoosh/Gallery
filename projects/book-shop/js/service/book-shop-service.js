'use strict';

var gId;
var gBooks;
const STORAGE_KEY_BOOKS = 'books';
const STORAGE_KEY_ID = 'id'
var gPage = 0;
const PAGE_SIZE = 5;

_createBooks();

function getBooks() {
    const startIdx = gPage * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id;
    });
    gBooks.splice(bookIdx, 1);
    _saveValueToStorage(STORAGE_KEY_BOOKS, gBooks);
}

function addBook(title, price) {
    var newBook = _createBook(title, price);
    gBooks.push(newBook);
    _saveValueToStorage(STORAGE_KEY_BOOKS, gBooks);
}

function updateBookPrice(id, price) {
    const book = gBooks.find(function (currBook) {
        return currBook.id === id;
    })
    book.price = price;
    _saveValueToStorage(STORAGE_KEY_BOOKS, gBooks);
}

function getBook(id) {
    const book = gBooks.find(function (currBook) {
        return (currBook.id === id)
    });
    return book;
}

function setBookRating(id, ratingValue) {
    const book = getBook(id);
    book.rating = ratingValue;
    _saveValueToStorage(STORAGE_KEY_BOOKS, gBooks);
}

function sortBooks(sortByStr) {
    switch (sortByStr) {
        case 'id':
            gBooks.sort(function (book1, book2) {
                return book1.id - book2.id;
            });
            break;
        case 'title':
            gBooks.sort(function (book1, book2) {
                var book1FirstLetter = book1.title.toLowerCase().charAt(0);
                var book2FirstLetter = book2.title.toLowerCase().charAt(0);
                if (book1FirstLetter < book2FirstLetter) return -1;
                else if (book1FirstLetter > book2FirstLetter) return 1;
                else return 0;
            });
            break;
        case 'price':
            gBooks.sort(function (book1, book2) {
                return book1.price - book2.price;
            });
            break;
        case 'rating':
            gBooks.sort(function (book1, book2) {
                return book1.rating - book2.rating;
            });
            break;
    }
}

function setNextPage(pageStr) {
    if (pageStr === 'forward') {
        gPage++;
        if (gPage * PAGE_SIZE > gBooks.length - 1) gPage--;
    }
    else {
        gPage--;
        if (gPage < 0) gPage++;
    }
}

function jumpToPage(pageNum){
    gPage = pageNum - 1;
}

function getCurrPage(){
    return gPage + 1;
}

function isLastPage() {
    if(gPage + 1 === getLastPage()) return true;
    return false;
}

function isFirstPage() {
    if(gPage === 0) return true;
    else return false; 
}

function getLastPage(){
    return Math.ceil(gBooks.length / PAGE_SIZE);
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY_BOOKS);
    if (!books || !books.length) books = [];
    gBooks = books;
    _saveValueToStorage(STORAGE_KEY_BOOKS, gBooks);
}

function _saveValueToStorage(key, value) {
    saveToStorage(key, value);
}

function _createBook(title, price) {
    var id = loadFromStorage(STORAGE_KEY_ID);
    if (!id) id = 1;
    _saveValueToStorage(STORAGE_KEY_ID, ++id)
    return {
        id: id,
        rating: 0,
        title,
        price,
        content: title + ' is a book about being a book random random random text this is random text pupik random text randoooommmm THIS IS RANDOM TEXT text that is random thank you for the CR random text shurot arukooot arukot'
    }
}