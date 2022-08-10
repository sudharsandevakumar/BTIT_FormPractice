import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private _http: HttpClient) {}

  apiUrl = 'http://localhost:3000/user/';

  createData(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}`, data);
  }

  getAllData(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }

  getUserById(id: any): Observable<any> {
    let ids = id;
    return this._http.get(`${this.apiUrl}${ids}`);
  }
}
