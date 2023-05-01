/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
// Select HTML body, section (card container) and overlay ()
const section = document.getElementsByTagName('section');
const overlay = document.querySelector('.overlay');
const addButton = document.getElementById('new-book');

// Grab the values that the user inputs
const input = {
  bookName: document.getElementById('name'),
  bookAuthor: document.getElementById('author'),
  bookPages: document.getElementById('pages'),
  bookRead: document.getElementById('read'),
  addBook: document.getElementById('add-book')
};

// Declare the Book class
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// Declare the array that will contain the library, which initially has one book
const myLibrary = [new Book('Fahrenheit 451', 'Ray Bradbury', 192, false)];

// Function to add a new Book object to the library array
function addBookToLibrary() {
  const newBook = new Book(
    input.bookName.value,
    input.bookAuthor.value,
    input.bookPages.value,
    input.bookRead.checked
  );

  myLibrary.push(newBook);
}

// Function to create and append all the HTML elements necessary for displaying a card
function displayCard(title, author, pages, read) {
  // Group all declared elements in a 'card' object
  const card = {
    header: document.createElement('div'),
    info: document.createElement('div'),
    footer: document.createElement('div'),
    divisor: document.createElement('hr'),
    divisor2: document.createElement('hr'),
    bookTitle: document.createElement('h3'),
    bookAuthor: document.createElement('h4'),
    bookPages: document.createElement('h5'),
    bookReadLabel: document.createElement('h4'),
    bookRead: document.createElement('input'),
    bookRemove: document.createElement('button')
  }

  // Set the content for every element based on the user input
  card.bookTitle.textContent = title;
  card.bookAuthor.textContent = author;
  card.bookPages.textContent = `${pages} pages`;
  card.bookRead.type = 'checkbox';
  card.bookRead.checked = read;
  card.bookReadLabel.textContent = 'Read';
  card.bookRemove.textContent = 'Remove';

  // Add respective classes
  card.header.classList.add('c-header');
  card.info.classList.add('c-info');
  card.footer.classList.add('c-read');

  card.header.appendChild(card.bookTitle);
  card.info.appendChild(card.bookAuthor);
  card.info.appendChild(card.bookPages);
  card.footer.appendChild(card.bookReadLabel);
  card.footer.appendChild(card.bookRead);
  card.footer.appendChild(card.bookRemove);

  const container = document.createElement('div');
  container.classList.add('card');
  container.appendChild(card.header);
  container.appendChild(card.divisor);
  container.appendChild(card.info);
  container.appendChild(card.divisor2);
  container.appendChild(card.footer);
  container.appendChild(card.bookRemove);

  return container;
}

function displayLibrary() {
  // clear section of all children
  section[0].innerHTML = '';
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for(const book of myLibrary) {
    section[0].appendChild(displayCard(book.title, book.author, book.pages, book.read));
  }
}

function addListeners() {
  const cardArray = Array.from(section[0].children);
  for(const card of cardArray) {
    const removeButton = card.children[5];
    removeButton.addEventListener('click', () => {
      myLibrary.splice(cardArray.indexOf(card), 1);
      displayLibrary();
      addListeners();
    });
  }
}

function clearFields() {
  input.bookName.value = '';
  input.bookAuthor.value = '';
  input.bookPages.value = '';
  input.bookRead.checked = false;
}

displayLibrary();
addListeners();

addButton.addEventListener('click', () => {
  overlay.style.display = "flex";
});

function fieldsMet() {
  return input.bookName.value !== '' && 
         input.bookAuthor.value !== '' && 
         input.bookPages.value > 0;
}

function addNewBook() {
  if(fieldsMet()) {
    addBookToLibrary();
    displayLibrary();
    clearFields();
    overlay.style.display = "none"; // hide overlay
    addListeners();
  }
}

input.addBook.addEventListener('click', addNewBook);

