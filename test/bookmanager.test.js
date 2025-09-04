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


  // Buku yang tidak ada
  test('Test menghapus buku yang tidak ada', () => {
    const removed = bookManager.removeBook("Non-existent Book");
    expect(removed).toBe(false);
    expect(bookManager.getBookCount()).toBe(0);
  });


  // Cari buku berdasarkan author
  test('Test mencari buku berdasarkan author', () => {
    const book1 = new Book("Book One", "Author A", 2020);
    const book2 = new Book("Book Two", "Author B", 2021);
    const book3 = new Book("Book Three", "Author A", 2022);
    bookManager.addBook(book1);
    bookManager.addBook(book2);
    bookManager.addBook(book3);
    const foundBooks = bookManager.findBooksByAuthor("Author A");
    expect(foundBooks.length).toBe(2);
    expect(foundBooks).toEqual(expect.arrayContaining([book1, book3]));
  });


  // Semua buku yang ada di list
  test('Test mendapatkan semua buku', () => {
    const book1 = new Book("Book One", "Author A", 2020);
    const book2 = new Book("Book Two", "Author B", 2021);
    bookManager.addBook(book1);
    bookManager.addBook(book2);
    const allBooks = bookManager.getAllBooks();
    expect(allBooks.length).toBe(2);
    expect(allBooks).toEqual(expect.arrayContaining([book1, book2]));
  });


  // Cari buku berdasarkan tahun
  test('Test mencari buku berdasarkan tahun', () => {
    const book1 = new Book("Book One", "Author A", 2020);
    const book2 = new Book("Book Two", "Author B", 2021);
    const book3 = new Book("Book Three", "Author C", 2020);
    bookManager.addBook(book1);
    bookManager.addBook(book2);
    bookManager.addBook(book3);
    const foundBooks = bookManager.findBooksByYear(2020);
    expect(foundBooks.length).toBe(2);
    expect(foundBooks).toEqual(expect.arrayContaining([book1, book3]));
  });


  // Test containsBook
  test('Test containsBook untuk buku yang ada', () => {
    const book = new Book("My Book", "Author A", 2022);
    bookManager.addBook(book);
    expect(bookManager.containsBook("My Book")).toBe(true);
  });


  test('Test containsBook untuk buku yang tidak ada', () => {
    expect(bookManager.containsBook("Unknown Book")).toBe(false);
  });


  // Test clearAllBooks
  test('Test clearAllBooks menghapus semua buku', () => {
    const book1 = new Book("Book One", "Author A", 2020);
    const book2 = new Book("Book Two", "Author B", 2021);
    bookManager.addBook(book1);
    bookManager.addBook(book2);
    bookManager.clearAllBooks();
    expect(bookManager.getBookCount()).toBe(0);
  });


  test('Test menambahkan null book', () => {
  expect(() => bookManager.addBook(null)).toThrow("Buku tidak boleh kosong");
});


test('Test removeBook dengan judul kosong', () => {
  expect(() => bookManager.removeBook("   ")).toThrow("Judul tidak valid");
});


test('Test findBooksByAuthor dengan input kosong', () => {
  expect(() => bookManager.findBooksByAuthor(" ")).toThrow("Author tidak valid");
});


test('Test findBooksByYear dengan tahun invalid', () => {
  expect(() => bookManager.findBooksByYear(3000)).toThrow("Tahun tidak valid");
});


});


