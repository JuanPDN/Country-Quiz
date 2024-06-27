import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { UpdateScoreService } from '../services/update-score.service';

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.css'
})
export class FinishComponent {

  score: number = this.scoreService.correctAnswer

  constructor(private router: Router, private scoreService: UpdateScoreService) { }

  playAgain() {
      this.router.navigate(['game/1'])
      this.scoreService.restart();
  }
}
