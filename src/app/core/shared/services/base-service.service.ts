import { Injectable } from '@angular/core';
import {Observable, of, throwError as observableThrowError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  constructor() { }

 public handleError<T>(error: any) {
   debugger;
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(`WTF HTTP ERROR: ${error}`); // log to console instead

      return of(error as T);
    };
  }
}
