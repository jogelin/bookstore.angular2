import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { SearchService } from '../services/search.service';
import { Book } from '../types/book';
 

@Component({
  selector: 'bs-book-search',
  templateUrl: 'book-search.template.html',
  styleUrls: [ 'book-search.component.css' ],
  providers: [ SearchService ]
})
export class BookSearchComponent implements OnInit {
  books: Observable<Book[]>;

  private searchTerms = new Subject<string>();
  
  constructor(
    private searchService: SearchService,
    private router: Router) {}
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  
  ngOnInit(): void {
    this.books = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.searchService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Book[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Book[]>([]);
      });
  }

  gotoDetail(book: Book): void {
    let link = ['/detail', book.id];
    this.router.navigate(link);
  }
}
