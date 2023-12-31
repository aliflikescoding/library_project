/* variables */
let addButton = document.querySelector('#addButton');
let bookForm = document.querySelector('#bookForm');
let bookFormBackground = document.querySelector('#bookFormBackground');
let cancelButton = document.querySelector('#cancelButton');
let submitButton = document.querySelector('#submitButton');
let myForm = document.querySelector('#myForm');

let mainAreaTwo = document.querySelector('.main-area-2');

let bookTitle = document.querySelector('#book_title');
let bookAuthor = document.querySelector('#book_author');
let bookPage = document.querySelector('#book_page');
let bookDesc = document.querySelector('#book_desc');
let readButton = document.querySelector('#readButton');
let readButtonTwo = document.querySelector('#readButtonTwo');
// let removeButton = document.querySelector('.remove-button');

let booksInLibrary = 0;
let myLibrary = [
  {
    "title": "The Life Of John Doe",
    "author": "John Doe",
    "page": "50",
    "description": "my life in a short book",
    "status": false
  },
];

window.onload = function() {
  showLibrary(booksInLibrary);
};


/* Object Constructors */
function Book(title, author, page, description, status) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.description = description
  this.status = status;
}

/* events */
addButton.addEventListener('click', () => {
    showForm();
});
cancelButton.addEventListener('click', () => {
    event.preventDefault();
    myForm.reset();
    hideForm();
});
submitButton.addEventListener('click', () => {
  event.preventDefault();
  createBook();
});

/* special event */
mainAreaTwo.addEventListener('click', function(event) {
  if (event.target.classList.contains('remove-button')) {
    let title = event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    let foundObject = myLibrary.findIndex(obj => obj.title === title);
    myLibrary.splice(foundObject, 1)
    booksInLibrary--;
    event.target.parentElement.remove()
  }
  else if (event.target.classList.contains('read-button')) {
    let title = event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    let foundObject = myLibrary.find(obj => obj.title === title);
    state = foundObject.status;
    if (state === false) {
      foundObject.status = true;
      event.target.classList.remove("button-secondary");
      event.target.classList.add("button-primary");
      event.target.innerText = "Read";
    }
    else {
      foundObject.status = false;
      event.target.classList.remove("button-primary");
      event.target.classList.add("button-secondary");
      event.target.innerText = "Not Read";
    }
  }
  else {}
});


/* functions */
function showForm() {
    bookForm.classList.remove('not-active');
    bookForm.classList.add('active');
    bookFormBackground.classList.add('parentDisable');
}

function hideForm() {
    bookForm.classList.remove('active');
    bookForm.classList.add('not-active');
    bookFormBackground.classList.remove('parentDisable');
}
function addBookToLibrary(book) {
  myLibrary.push(book)
}

function createBook() {
    if (bookTitle.value != "" && bookAuthor.value != "" && bookPage.value != "" && bookDesc.value != "") {
      let title = bookTitle.value;
      let author = bookAuthor.value;
      let pages = bookPage.value;
      let desc = bookDesc.value;
      let status;
      if (readButton.checked == true) {
        status = true;
      }
      else if (readButtonTwo.checked == true) {
        status = false;
      }
      else {}
      let book = new Book(title, author, pages, desc,  status);
      addBookToLibrary(book);
      booksInLibrary++;
      showLibrary(booksInLibrary);
      hideForm();
      myForm.reset();
    }
}

function showLibrary(booksInLibrary) {
  for (let i = booksInLibrary; i < myLibrary.length; i++) {
    let obj = myLibrary[i];
    let cardObj = document.createElement("div");
    cardObj.classList.add('card');
    Object.getOwnPropertyNames(obj).forEach(key => {
      if (key == "title") {
        let titleObj = document.createElement("h2");
        titleObj.innerText = `${obj[key]}`;
        cardObj.appendChild(titleObj);
      }
      else if (key == "author") {
        let authorObj = document.createElement("p");
        authorObj.innerText = `${obj[key]}`;
        cardObj.appendChild(authorObj);
      }
      else if (key == "page") {
        let pageObj = document.createElement("p");
        pageObj.innerText = `${obj[key]}`;
        cardObj.appendChild(pageObj);
      }
      else if (key == "description") {
        let descriptionObj = document.createElement("p");
        descriptionObj.innerText = `${obj[key]}`;
        cardObj.appendChild(descriptionObj);
      }
      else if (key == "status") {
        let statusObj = document.createElement("button");
        statusObj.classList.add('button');
        if (obj[key] == false) {
          statusObj.innerText = "Not Read";
          statusObj.classList.add('button-secondary', 'read-button');
        }
        else {
          statusObj.innerText = "Read";
          statusObj.classList.add('button-primary', 'read-button');
        }
        cardObj.appendChild(statusObj);
      }
    });
    let deleteObjButton = document.createElement("button");
    deleteObjButton.classList.add('button', 'button-error', 'remove-button');
    deleteObjButton.innerText = "Remove";
    cardObj.appendChild(deleteObjButton);
    mainAreaTwo.appendChild(cardObj);
  }
}

