import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Book } from '../types/book';
import { Http, Headers, Response } from '@angular/http';
import { AppStore, ActionTypes } from './../services/app.store';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
  bookApiUrl: string = 'app/books';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, private appStore: AppStore) { }

  getBooks(): void {
    this.http.get(this.bookApiUrl)
      .map((res: Response) => res.json().data as Book[])
      .catch(this.handleObservableError)
      .subscribe((books) =>
        this.appStore.store.dispatch({
          type: ActionTypes.GET_BOOKS,
          books: books
        }));
  }

  update(book: Book): void {
    const url = `${this.bookApiUrl}/${book.id}`;
    this.http.put(url, book)
      .catch(this.handleObservableError)
      .subscribe(() =>
        this.appStore.store.dispatch({
          type: ActionTypes.UPDATE_BOOK,
          book: book
        }));
  }

  create(title: string): void {
    const newBook = {
      id: 777,
      title: title,
      category: 'web'
    };

    this.http.post(this.bookApiUrl, newBook)
      .catch(this.handleObservableError)
      .subscribe(() =>
        this.appStore.store.dispatch({
          type: ActionTypes.ADD_BOOK,
          book: newBook
        }));
  }

  delete(id: number): void {
    const url = `${this.bookApiUrl}/${id}`;
    this.http.delete(url)
      .catch(this.handleObservableError)
      .subscribe(() =>
        this.appStore.store.dispatch({
          type: ActionTypes.DELETE_BOOK,
          bookId: id
        }));
  }

  getBook(id: number): void {
    const url = `${this.bookApiUrl}/${id}`;
    this.http.get(url)
      .map((res: Response) => res.json().data as Book[])
      .catch(this.handleObservableError)
      .subscribe((book) =>
        this.appStore.store.dispatch({
          type: ActionTypes.GET_BOOK,
          book: book
        }));
  }

  private handleObservableError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
