'use strict'
var gBookId

function renderBooks() {
    var books = getBooks()

    books = getBooksBySorting(books)

    var strHtmls = books.map(function (book) {
        return `<tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.price}</td>
                <td><button onclick="onReadBook(${book.id})" data-trans="read" class="actions">${getTrans('read')}</button></td>
                <td><button onclick="onUpdateBook(${book.id})" data-trans="update" class="actions">${getTrans('update')}</button></td>
                <td><button onclick="onRemoveBook(${book.id})" data-trans="delete" class="actions">${getTrans('delete')}</button></td>
            </tr>`
    })

    document.querySelector('.books-list').innerHTML = strHtmls.join('');
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    var ElAdd = document.querySelector('.adding')
    ElAdd.style.display = 'block';
    var ElBtn = ElAdd.querySelector('.adding-book')
    ElBtn.onclick = () => onAddNewBook()
}

function onAddNewBook() {
    var ElAdd = document.querySelector('.adding')
    var ElBookName = ElAdd.querySelector('.name')
    var bookName = ElBookName.value
    var ElPrice = ElAdd.querySelector('.price')
    var price = ElPrice.value
    ElAdd.style.display = 'none';
    addBook(bookName, price)
    renderBooks()
    ElBookName.value = ''
    ElPrice.value = ''
}

function onUpdateBook(bookId) {
    var elUpdate = document.querySelector('.updating')
    elUpdate.style.display = 'block';
    var ElBtn = elUpdate.querySelector('.update-price')
    ElBtn.onclick = () => onUpdatePrice(bookId)
}

function onUpdatePrice(bookId) {
    console.log('book id', bookId);
    var elUpdate = document.querySelector('.updating')
    var elPrice = elUpdate.querySelector('.price')
    var newPrice = elPrice.value
    var elUpdate = document.querySelector('.updating')
    elUpdate.style.display = 'none';
    updateBook(bookId, newPrice);
    renderBooks();
    elPrice.value = ''
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.style.display='initial'
    elModal.querySelector('h4').innerText = book.name
    elModal.querySelector('div').innerHTML = `<img src=${book.imgUrl}></img>`
    elModal.querySelector('.add-price').innerText = ' - '  + book.price
    elModal.querySelector('p').innerText = book.details
    elModal.querySelector('.rate').innerText = book.rate
    gBookId = bookId
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function onCloseModal() {

    var elModal = document.querySelector('.modal')
    var rating = elModal.querySelector('.rate').innerText
    setRating(gBookId, rating)
    elModal.style.display='none'
}

function onUpRate() {
    var rating = document.querySelector('.rate').innerText
    rating++
    if (rating > 10) return
    document.querySelector('.rate').innerText = rating
}

function onDownRate() {
    var rating = document.querySelector('.rate').innerText
    rating--
    if (rating < 0) return
    document.querySelector('.rate').innerText = rating
}

function onSortingBook(sortingBy) {
    setSorting(sortingBy);
    renderBooks();

}

function onNextPage() {
    netxtPage()
    renderBooks()
}

function onSetLang(lang) {
    setLang(lang);
    // TODO: if lang is hebrew add RTL class to document.body
    var elBody = document.querySelector('body')
    if(lang === 'he') {
       elBody.classList.add('rtl')
       var elTds = document.querySelectorAll('td')
       elTds.forEach((td) => td.classList.add('rtl-font'))
    } else {
        elBody.classList.remove('rtl')
    }
    doTrans();
    // renderBooks()
}