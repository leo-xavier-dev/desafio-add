import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Character } from '../models/character';
import { Comics } from '../models/comics';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  PUBLIC_KEY: string;
  HASH: string;
  MODAL: string;
  URL_API: string;

  dados: string;

  constructor(private http: HttpClient) { }

  getData(endpoint) {
    this.PUBLIC_KEY = 'f089664b5ddf63b8f2cdf3a40f3de932';
    this.HASH = 'a50af4b790d264ae7ba789d32a26a9bf';
    this.MODAL = endpoint;
    this.URL_API = `https://gateway.marvel.com:443/v1/public/${this.MODAL}?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;

    return this.URL_API
  }

  getAllCharacters(metadata): Observable<Character[]> {

    this.dados = this.getData('characters');

    this.URL_API = this.dados;

    this.URL_API = this.URL_API + "&offset=" + metadata.offset

    return this.http.get<Character[]>(this.URL_API)
      .pipe(
        retry(2),
        catchError(this.handleError))

  }

  getAllComics(metadata): Observable<Comics[]> {

    this.dados = this.getData('comics');

    this.URL_API = this.dados;

    this.URL_API = this.URL_API + "&offset=" + metadata.offset

    return this.http.get<Comics[]>(this.URL_API)
      .pipe(
        retry(2),
        catchError(this.handleError))

  }

  handleError(error: HttpErrorResponse) {

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }

    console.log(errorMessage);
    return throwError(errorMessage);

  };
}
