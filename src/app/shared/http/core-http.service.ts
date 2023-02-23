import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreHttpService {
  constructor(private http: HttpClient) {}

  post<T>(
    url: string,
    body?: any,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
      | undefined,
    params?:
      | HttpParams
      | {
          [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
        }
  ): Observable<HttpResponse<T>> {

    let defaultHeader = new HttpHeaders();
    defaultHeader = 
      defaultHeader.append('Content-Type', 'application/json');
    
    return this.http.post<T>(url, body, {
      headers: headers ?? defaultHeader,
      observe: 'response',
      params: params,
    });
  }
}
