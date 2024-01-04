import { Book } from './module/book';

const booksGrid = document.getElementById('booksGrid') as HTMLElement;

  // Setting opacity to only the background color from book.color, and nothing els.
  function bgcToRGBA(bgc: string, opacity: number): string {
    let [r, g, b] = bgc.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

async function getBooks(): Promise<void> {
  const url: string =
    'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';
  const response: Response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const books: Book[] = await response.json();

  if (!booksGrid) {
    throw new Error('Element with id "booksGrid" not found.');
  }

  books.forEach((book) => {
    const bookDiv = document.createElement('div') as HTMLElement;
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
    const bookInfo = document.createElement('div') as HTMLElement;
    bookInfo.style.display = 'none';
    const author = document.createElement('p') as HTMLElement;
    author.innerHTML = `<span class="highlight">Author:</span> ${book.author}`;
    const plot = document.createElement('p') as HTMLElement;
    plot.innerHTML = `<p class="highlight">Story:</p> ${book.plot}`;
    const audience = document.createElement('p') as HTMLElement;
    audience.innerHTML = `<span class="highlight">Audience:</span> ${book.audience}`;
    const year = document.createElement('p') as HTMLElement;
    year.innerHTML = `<span class="highlight">First published:</span> ${book.year}`;
    const pages = document.createElement('p') as HTMLElement;
    pages.innerHTML = `<span class="highlight">Pages:</span> ${book.pages}`;
    const publisher = document.createElement('p') as HTMLElement;
    publisher.innerHTML = `<span class="highlight">Publisher:</span> ${book.publisher}`;

    // Append all the created elements to the bookInfo div
    bookInfo.append(author, plot, audience, year, pages, publisher);
    // Append the title and bookInfo div to the main book container div
    bookDiv.append(title, bookInfo);
    // Append the book container div to the books grid container
    booksGrid.append(bookDiv);
  });
}

// Function to toggle the visibility of bookInfo, makes the not current div use display.none.
const toggleBookInfo = (currentBookDiv: HTMLElement): void => {
  document.querySelectorAll('.book div').forEach((element) => {
    const bookInfo = element as HTMLElement;
    if (bookInfo !== currentBookDiv.querySelector('div')) {
      bookInfo.style.display = 'none';
    }
  });

  // Show the current div and closing the previous div automatic.
  const bookInfo = currentBookDiv.querySelector('div') as HTMLElement;
  bookInfo.style.display = bookInfo.style.display === 'none' ? 'block' : 'none';
};

getBooks();
