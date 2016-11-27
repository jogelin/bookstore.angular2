import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Book } from './../types/book';
import { Injectable } from '@angular/core';
import { createStore, Store, combineReducers, Action } from 'redux'

export interface IAppState {
    books: Book[]
};

export enum ActionTypes { GET_BOOKS, GET_BOOK, ADD_BOOK, UPDATE_BOOK, DELETE_BOOK };

@Injectable()
export class AppStore {
    store: Store<IAppState>;
    state$: BehaviorSubject<IAppState> = new BehaviorSubject<IAppState>({ books: [] });

    constructor() {
        const reducers = combineReducers<IAppState>({
            books: this.booksReducer
        });

        this.store = createStore(reducers);

        this.store.subscribe(() => this.state$.next(this.store.getState()));
        
        
    }

    booksReducer(books: Book[] = [], action): Book[] {
        //console.log(action);
        switch (action.type) {
            //case ActionTypes.GET_BOOK:
            case ActionTypes.GET_BOOKS:
                return action.books;
            case ActionTypes.DELETE_BOOK:
                return books.filter((book) => book.id != action.bookId);
            case ActionTypes.UPDATE_BOOK:
                return books.filter((book) => book.id === action.book.id).map((book) => book = action.book);
            case ActionTypes.ADD_BOOK: ;
                return [...books, action.book];
            default:
                return books;

        }
    }
}