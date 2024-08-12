import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, take, tap, throwError } from "rxjs";
import { AutocompleteItem } from "../types";

@Injectable({providedIn: 'root'})

export class LocationService {

  constructor(private http: HttpClient) {}

  // Example of how you may handle some logic and also error handling
  public getCities(): Observable<AutocompleteItem[]> {
    return this.http.get<AutocompleteItem[]>('http://localhost:8080/cities').pipe(
      map((response: AutocompleteItem[]) =>{
        // Do any logic
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          // Unauthorized do not allow to continue reroute perhaps?
        }
        // Do any further error handling, you would normally have a global error
        // handler in the http inteceptor but this is beyond the scope of this work
        return throwError(() => new Error(`I have errored with ${error.message}`));
      }));
  }

  public getCountries(): Observable<AutocompleteItem[]> {
    return this.http.get<AutocompleteItem[]>('http://localhost:8080/countries');
  }
}
