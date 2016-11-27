import { AppStore } from './../services/app.store';
import { AppService } from './../services/app.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Book } from '../types/book';
import 'rxjs/add/operator/combineLatest';


@Component({
  selector: 'bs-books',
  templateUrl: 'books.template.html',
  styleUrls: ['books.component.css']
})
export class BooksComponent {
  books$: Observable<Book[]>;
  selectedBook: Book;

  constructor(
    private appService: AppService,
    private appStore: AppStore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }
  getBooks(): void {
    // Get all the books 
    this.appService.getBooks();
    this.books$ = this.appStore.state$.map((state) => state.books);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.appService.create(title);
  }

  delete(book: Book): void {
    this.appService.delete(book.id);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedBook.id]);
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
  }
}

