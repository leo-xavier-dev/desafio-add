import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Character } from './../../../models/character';



@Injectable({
  providedIn: 'root'
})

export class CharactersApiService {
  PUBLIC_KEY = 'f089664b5ddf63b8f2cdf3a40f3de932';
  HASH = 'a50af4b790d264ae7ba789d32a26a9bf';
  URL_API = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;

  constructor(private http: HttpClient) { }


   getAllCharacters(metadata): Observable<Character[]> {
    //  return this.http.get<any>(this.URL_API)
    //  .pipe(map((data: any) => data.data.results))

    this.URL_API = this.URL_API + "&offset=" + metadata.offset

    return this.http.get<Character[]>(this.URL_API)
      .pipe(
        retry(2),
        catchError(this.handleError))

   }

    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


}
