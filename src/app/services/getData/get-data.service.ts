import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';
import { generateQuestions } from '../../utils/questionsGenerator';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class GetDataService {


  constructor(private http: HttpClient) { }

  getAllData(): Observable<any> {
    return this.http
    .get(environment.API_URL)
    .pipe(
      retry(1),
      map((data: any) =>
      generateQuestions(data)
    ));
  }
}
