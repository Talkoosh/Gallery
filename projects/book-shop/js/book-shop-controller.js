'use strict';

function onInit() {
    renderBooks();
    renderPageButtons(); 
}

function renderBooks() {
    const books = getBooks();
    var strHTML = '';

    for (var i = 0; i < books.length; i++) {
        strHTML += `<tr><td>${books[i].id}</td><td>${books[i].title}
        </td><td>${books[i].price}$</td><td>${books[i].rating}</td>
        <td><button onclick="onReadBook(${books[i].id})" class="read-button">Read</button></td>
        <td><button onclick="onUpdateBookPrice(${books[i].id})" class="update-button">Update</button></td>
        <td><button onclick="onDeleteBook(${books[i].id})" class="delete-button" id="${books[i].id}">Delete</button></td></tr>`;
    }
    document.querySelector('table tbody').innerHTML = strHTML;
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
    renderPageButtons(); 
}

function onAddBook() {
    const bookTitle = document.querySelector('[name="book-name"]').value
    const bookPrice = +document.querySelector('[name="book-price"]').value;
    if(!bookTitle || !bookPrice) return;
    addBook(bookTitle, bookPrice);
    clearBookInput();
    renderBooks();
    renderPageButtons();
}

function onUpdateBookPrice(bookId) {
    const elButton = document.querySelector('.price-modal button');
    elButton.setAttribute('data-id', bookId);
    showPriceUpdateModal();
}

function onReadBook(bookId) {
    const book = getBook(bookId);
    renderReadModal(book);
}

function renderReadModal(book) {
    const elModal = document.querySelector('.read-modal');
    elModal.querySelector('.read-summary').innerText = book.content;
    elModal.querySelector('h3').innerText = book.title;
    elModal.querySelector('.read-price').innerText = book.price + '$';
    renderModalInput(elModal, book);
    elModal.classList.add('show-read-modal');
}

function renderModalInput(elModal, book){
    elModal.querySelector('.rating-input').innerHTML = `<input name="${book.id}" value="${book.rating}" type="number" 
    min="0" max="10">
    <button class="rating-button" onclick="onBookRatingChange(${book.id})">Submit Rating</button>`
}

function onModalExit() {
    const elModal = document.querySelector('.read-modal');
    elModal.classList.remove('show-read-modal');

}

function onBookRatingChange(bookId){
    const elRatingInput = document.querySelector('.rating-input input');
    setBookRating(bookId, elRatingInput.value); 
    onModalExit();
    renderBooks();
}

function onPriceModalButtonClick(elButton){
    const bookId = elButton.dataset.id; 
    const elModalInput = document.querySelector('[name="update-input"]');
    updateBookPrice(+bookId, +elModalInput.value);
    hidePriceUpdateModal();
    renderBooks();
    
    elModalInput.value = '';
}

function onSortBooks(sortByStr){
    sortBooks(sortByStr);
    renderBooks();
}

function onNextPage(pageStr){
    setNextPage(pageStr);
    renderPageButtons(); 
    renderBooks();
}

function renderPageButtons(){
    togglePageButtons();

    var strHTML = ''; 
    const lastPage = getLastPage();
    for(var i = 1; i <= lastPage; i++){
        strHTML += `<button onclick="onPageNumberClick(${i})">${i}</button>`
    } 
    const elPageNumbersDiv = document.querySelector('.page-numbers');
    elPageNumbersDiv.innerHTML = strHTML;
}

function onPageNumberClick(pageNum){
    jumpToPage(pageNum);
    togglePageButtons();
    renderBooks(); 
}

function togglePageButtons(currPageNum){
    const elForwardBtn = document.querySelector('.forward-button');
    const elBackwardBtn = document.querySelector('.backward-button');
    elForwardBtn.disabled = isLastPage(); 
    elBackwardBtn.disabled = isFirstPage(); 
}

function hidePriceUpdateModal(){
    const elModal = document.querySelector('.price-modal');
    elModal.classList.remove('show-price-modal');
}

function showPriceUpdateModal(){
    document.querySelector('.price-modal').classList.add('show-price-modal');
}   

function clearBookInput(){
    document.querySelector('[name="book-name"]').value = '';
    document.querySelector('[name="book-price"]').value = '';
}
