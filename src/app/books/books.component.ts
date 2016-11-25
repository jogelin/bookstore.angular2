import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from '../types/book';
import { AppService } from '../services/app.service';

@Component({
  selector: 'bs-books',
  templateUrl: 'books.template.html',
  styleUrls: ['books.component.css'],
  providers: [ AppService ]
})
export class BooksComponent {
  books: Book[] = [];
  selectedBook: Book;

  constructor(
    private appService: AppService,
    private router: Router
    ) { }

  getBooks(): void {
    this.appService.getBooks().then(books => {
        console.log(books);
        this.books = books;
    });
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.appService.create(title)
      .then(book => {
        this.books.push(book);
        this.selectedBook = null;
      });
  }
  
  delete(book: Book): void {
    this.appService
      .delete(book.id)
      .then(() => {
        this.books = this.books.filter(b => b !== book);
        if (this.selectedBook === book) { this.selectedBook = null; }
      });
  }

  ngOnInit(): void {
    this.getBooks();
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedBook.id]);
  }
}

