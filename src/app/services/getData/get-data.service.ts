import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';
import { generateQuestions } from '../../utils/questionsGenerator';
import { environment } from '../../../environments/environment';
import { Question } from '../../interfaces/question';
import { Country } from '../../interfaces/country';



@Injectable({
  providedIn: 'root'
})
export class GetDataService {


  constructor(private http: HttpClient) {}

  getAllData(): Observable<Question[]> {
    return this.http
      .get<Country[]>(environment.API_URL)
      .pipe(
        retry(1),
        map((data: Country[]) => generateQuestions(data))
      );
  }
}
