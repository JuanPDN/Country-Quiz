import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { UpdateScoreService } from '../services/update-score.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.css'
})
export class FinishComponent {

  score: number = this.scoreService.correctAnswer

  constructor(
    private router: Router, 
    private scoreService: UpdateScoreService,
    private meta : Meta
  ) { 
    this.meta.updateTag({name: 'final score', content: 'Country Quiz - Score'})
  }

  playAgain() {
      this.router.navigate(['game/1'])
      this.scoreService.restart();
  }
}
