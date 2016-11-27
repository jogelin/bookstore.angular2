import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppService } from './../services/app.service';
import { AppStore, ActionTypes, IAppState } from './../services/app.store';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Book } from '../types/book';

@Component({
  styleUrls: ['dashboard.component.css'],
  selector: 'bs-dashboard',
  templateUrl: 'dashboard.template.html'
})
export class DashboardComponent implements OnInit {

  books$: Observable<Book[]>;

  constructor(private appService: AppService, private appStore: AppStore) { }

  ngOnInit(): void {
    // Get all the books
    this.appService.getBooks();
    this.books$ = this.appStore.state$.map((state) => state.books);
  }
}