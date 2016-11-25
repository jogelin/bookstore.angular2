import { Injectable } from '@angular/core';
import { Book } from '../types/book';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
  bookApiUrl: string = 'app/books';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getBooks(): Promise<Book[]> {
    return this.http.get(this.bookApiUrl)
              .toPromise()
              .then(res => {
                return res.json().data as Book[]
              })
              .catch(this.handleError);
  }


  update(book: Book): Promise<Book> {
    const url = `${this.bookApiUrl}/${book.id}`;
    return this.http
      .put(url, JSON.stringify(book), {headers: this.headers})
      .toPromise()
      .then(() => book)
      .catch(this.handleError);
  }

  create(title: string): Promise<Book> {
    return this.http
      .post(this.bookApiUrl, 
            JSON.stringify({title}), 
            { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.bookApiUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getBook(id: number): Promise<Book> {
    return this.getBooks()
          .then(books => books.find(book => book.id === id));
  }

  getBooksSlowly(): Promise<Book[]> {
    return new Promise<Book[]>(resolve =>
      setTimeout(resolve, 2000))
          .then(() => this.getBooks());
  }
}
