import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  constructor(private http: HttpClient) { }
  getAllData():Observable<any> {
    return this.http.get('https://country-page-jp.vercel.app/api/countries')
  }
}
