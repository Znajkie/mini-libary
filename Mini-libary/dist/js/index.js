var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const booksGrid = document.getElementById('booksGrid');
// Setting opacity to only the background color from book.color, and nothing els.
function bgcToRGBA(bgc, opacity) {
    let [r, g, b] = bgc.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
function getBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const books = yield response.json();
        if (!booksGrid) {
            throw new Error('Element with id "booksGrid" not found.');
        }
        books.forEach((book) => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.style.backgroundColor = book.color
                ? bgcToRGBA(book.color, 0.8)
                : 'transparent';
            // Title as a clickable element
            const title = document.createElement('h2');
            title.textContent = book.title;
            title.classList.add('title--text');
            title.onclick = () => toggleBookInfo(bookDiv); // Adding click event listener
            // Create a div element for bookInfo, initially hidden
            const bookInfo = document.createElement('div');
            bookInfo.style.display = 'none';
            const author = document.createElement('p');
            author.innerHTML = `<span class="highlight">Author:</span> ${book.author}`;
            const plot = document.createElement('p');
            plot.innerHTML = `<p class="highlight">Story:</p> ${book.plot}`;
            const audience = document.createElement('p');
            audience.innerHTML = `<span class="highlight">Audience:</span> ${book.audience}`;
            const year = document.createElement('p');
            year.innerHTML = `<span class="highlight">First published:</span> ${book.year}`;
            const pages = document.createElement('p');
            pages.innerHTML = `<span class="highlight">Pages:</span> ${book.pages}`;
            const publisher = document.createElement('p');
            publisher.innerHTML = `<span class="highlight">Publisher:</span> ${book.publisher}`;
            // Append all the created elements to the bookInfo div
            bookInfo.append(author, plot, audience, year, pages, publisher);
            // Append the title and bookInfo div to the main book container div
            bookDiv.append(title, bookInfo);
            // Append the book container div to the books grid container
            booksGrid.append(bookDiv);
        });
    });
}
// Function to toggle the visibility of bookInfo, makes the not current div use display.none.
const toggleBookInfo = (currentBookDiv) => {
    document.querySelectorAll('.book div').forEach((element) => {
        const bookInfo = element;
        if (bookInfo !== currentBookDiv.querySelector('div')) {
            bookInfo.style.display = 'none';
        }
    });
    // Show the current div and closing the previous div automatic.
    const bookInfo = currentBookDiv.querySelector('div');
    bookInfo.style.display = bookInfo.style.display === 'none' ? 'block' : 'none';
};
getBooks();
export {};
