import { Injectable } from '@angular/core';
import {Observable, of, throwError as observableThrowError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  constructor() { }

 public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }
}
