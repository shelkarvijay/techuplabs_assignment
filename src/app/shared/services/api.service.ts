import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //We can create const's somewhere globally for all base url's 
  baseUrl: string = 'https://api.first.org/data/v1/'; 
  constructor(
    private http: HttpClient
  ) { }

  getCountries(endPoint: string): Observable<any> {
    /**
     * We can use HTTPInterceptor to handle all api request,
     * response, error, etc
     */
    return this.http.get(this.baseUrl + endPoint);
  }
}
