import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  constructor(private http: HttpClient) {}

  api: string;
  delayTime = 100;

  public getPets(page = 1, limit = 10): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(`${this.getApi()}?limit=${limit}&page=${page}&size=small`, {
        headers: this.getHeaders(),
        observe: 'response'
      })
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.handleErrors(error);
          return throwError(errorMessage);
        })
      );
  }

  private handleErrors(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return errorMessage;
  }

  private getHeaders(): HttpHeaders | { [header: string]: string | string[] } {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-API-KEY', 'dc22fe67-f247-40d7-8b6d-2babe467f584')
      .set('Accept', 'application/json');
  }

  private getApi() {
    return `https://api.the${
      this.api === 'cat' ? 'cat' : 'dog'
    }api.com/v1/images/search`;
  }

  getTitle() {
    return of(this.api === 'cat' ? 'Cats' : 'Dogs').pipe(delay(this.delayTime));
  }
}
