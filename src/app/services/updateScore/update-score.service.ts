import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateScoreService {

  correctAnswer: number = 0;
  tries: number = 0;

  UpdateScore() {
    this.correctAnswer++
  }
  updateTries() {
    this.tries++
  }

  restart() {
    this.correctAnswer = 0
    this.tries = 0
  }


}
