const section = document.getElementsByTagName('section');
const overlay = document.querySelector('.overlay');
const addNewBook = document.getElementById('new-book');

const input = {
  bookName: document.getElementById('name'),
  bookAuthor: document.getElementById('author'),
  bookPages: document.getElementById('pages'),
  bookRead: document.getElementById('read'),
  addBook: document.getElementById('add-book')
};

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary() {
  const newBook = new Book(
    input.bookName.value,
    input.bookAuthor.value,
    input.bookPages.value,
    input.bookRead.checked
  );

  myLibrary.push(newBook);
}

function displayCard(title, author, pages, read) {
  const card = {
    header: document.createElement('div'),
    info: document.createElement('div'),
    footer: document.createElement('div'),
    bookTitle: document.createElement('h2'),
    bookAuthor: document.createElement('h3'),
    bookPages: document.createElement('h4'),
    bookRead: document.createElement('input'),
    bookRemove: document.createElement('button')
  }

  card.bookTitle.textContent = title;
  card.bookAuthor.textContent = author;
  card.bookPages.value = pages;
  card.bookRead.type = 'checkbox';
  card.bookRead.checked = read;
  card.bookRemove.textContent = 'X';

  card.header.classList.add('c-header');
  card.info.classList.add('c-info');
  card.footer.classList.add('c-read');

  card.header.appendChild(card.bookTitle);
  card.header.appendChild(card.bookRemove);
  card.info.appendChild(card.bookAuthor);
  card.info.appendChild(card.bookPages);
  card.footer.appendChild(card.bookRead);

  const container = document.createElement('div');
  container.classList.add('card');
  container.appendChild(card.header);
  container.appendChild(card.info);
  container.appendChild(card.footer);

  return container;
}

function displayLibrary() {
  section[0].innerHTML = '';
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for(const book of myLibrary) {
    section[0].appendChild(displayCard(book.title, book.author, book.pages, book.read));
  }
}

addNewBook.addEventListener('click', () => {
  overlay.style.display = "flex";
})

input.addBook.addEventListener('click', () => {
  overlay.style.display = "none";
  addBookToLibrary();
  displayLibrary();
});