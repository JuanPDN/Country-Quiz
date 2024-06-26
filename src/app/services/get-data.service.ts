import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { generateQuestions } from '../utils/questionsGenerator';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  getAllData(): Observable<any> {
    return this.http.get('https://country-page-jp.vercel.app/api/countries').pipe(map((data: any) =>
      generateQuestions(data)
    ));
  }
}
