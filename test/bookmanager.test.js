const Book = require('../book');
const BookManager = require('../bookManager');

describe('BookManager', () => {
  let bookManager;

  beforeEach(() => {
    bookManager = new BookManager();
  });

  test('Test menambahkan buku', () => {
    const book = new Book("Test Book", "Test Author", 2023);
    bookManager.addBook(book);
    expect(bookManager.getBookCount()).toBe(1);
  });

  test('Test menghapus buku yang ada', () => {
    const book = new Book("To Remove", "Author", 2023);
    bookManager.addBook(book);
    const removed = bookManager.removeBook("To Remove");
    expect(removed).toBe(true);
    expect(bookManager.getBookCount()).toBe(0);
  });

  //Lengkapi Unit Test dibawah untuk buku yang memang tidak terdapat pada list
  test('Test menghapus buku yang tidak ada', () => {
    const removed = bookManager.removeBook("Non-existent Book");
    expect(removed).toBe(false);
    expect(bookManager.getBookCount()).toBe(0);
  });

  //Lengkapi Unit Test dibawah untuk mencari buku berdasarkan penulis
  test('Test mencari buku berdasarkan author', () => {
    const book1 = new Book("Book One", "Author A", 2020);
    const book2 = new Book("Book Two", "Author B", 2021);
    const book3 = new Book("Book Three", "Author A", 2022);
    bookManager.addBook(book1);
    bookManager.addBook(book2);
    bookManager.addBook(book3);
    const foundBooks = bookManager.findBooksByAuthor("Author A");
    expect(foundBooks.length).toBe(2);
  });

  //Lengkapi Unit Test dibawah untuk seluruh buku yang ada di dalam list
  test('Test mendapatkan semua buku', () => {
    const book1 = new Book("Book One", "Author A", 2020);
    const book2 = new Book("Book Two", "Author B", 2021);
    bookManager.addBook(book1);
    bookManager.addBook(book2);
    const allBooks = bookManager.getAllBooks();
    expect(allBooks.length).toBe(2);
  });
});