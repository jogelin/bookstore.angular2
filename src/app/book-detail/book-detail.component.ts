// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { AppService } from '../services/app.service';
import { AppStore } from '../services/app.store';
import { Book } from '../types/book';

@Component({
  selector: 'bs-book-detail',
  styleUrls: ['book-detail.component.css'],
  templateUrl: 'book-detail.template.html'
})
export class BookDetailComponent {
  @Input()
  book: Book;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private appService: AppService,
    private appStore: AppStore
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.appStore.state$
        .map((state) => state.books.filter((book) => book.id == +params['id'])[0]))
        .subscribe(book => this.book = book);
  }

  save(): void {
    this.appService.update(this.book);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
