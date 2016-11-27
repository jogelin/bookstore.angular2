import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../services/search.service';
import { Book } from '../types/book';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';


@Component({
  selector: 'bs-book-search',
  templateUrl: 'book-search.template.html',
  styleUrls: ['book-search.component.css'],
  providers: [SearchService]
})
export class BookSearchComponent implements OnInit {
  books$: Observable<Book[]>;
  searchTerm$: Subject<string>;


  constructor(
    private searchService: SearchService,
    private router: Router) {
    this.searchTerm$ = new Subject<string>();
  }

  search(term: string): void {
    this.searchTerm$.next(term);
  }

  ngOnInit(): void {
    this.books$ = this.searchTerm$
      .debounceTime(200)
      .switchMap((term) => this.searchService.search(term));

  }

  gotoDetail(book: Book): void {
    this.router.navigate(['/detail', book.id]);
  }
}
