import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';

import { NavbarComponent } from "../navbar/navbar.component";
import { GetDataService } from '../services/getData/get-data.service';
import { UpdateScoreService } from '../services/updateScore/update-score.service';
import { LoadingComponent } from '../loading/loading.component';
import { Question } from '../interfaces/question';



@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrl: './game.component.css',
    imports: [NavbarComponent, RouterOutlet, LoadingComponent]
})
export class GameComponent implements OnInit {
    route: ActivatedRoute = inject(ActivatedRoute);
    questionId: number = 1;
    load: boolean = true;
    questions: Question[] = [];

    constructor(
        private dataService: GetDataService,
        private router: Router,
        private scoreService: UpdateScoreService,
        private meta: Meta
    ) {
        this.route.params.subscribe(params =>
            this.questionId = Number(params['questionId'])
        );
    }

    submitAnswer(event: Event) {
        const tries = this.scoreService.tries
        let response = (event.target as HTMLButtonElement).textContent!;
        if (!this.questions[this.questionId - 1].response) {
            this.questions[this.questionId - 1].yourAnswer = response.trim();
            this.questions[this.questionId - 1].response = true;
            if (tries < 10) {
                this.nextQuestion()
            }
            this.validateAnswer()
        }
    }

    validateAnswer() {
        this.scoreService.updateTries()
        const tries = this.scoreService.tries
        const yourAnswer = this.questions[this.questionId - 1].yourAnswer
        const answer = this.questions[this.questionId - 1].answer
        if (yourAnswer === answer) {
            this.scoreService.UpdateScore()
        }
        if (tries === 10) {
            setTimeout(() => {
                this.router.navigate(['score'])
            }, 1500)
        }
    }

    nextQuestion() {
        setTimeout(() => {
            if (this.questionId < 10) {
                this.router.navigate(['game', this.questionId + 1])
            }
        }, 1500)
    }

    ngOnInit(): void {
        this.dataService.getAllData().subscribe((data) => {
            this.load = false
            return this.questions = data
        })
        this.meta.updateTag({ name: 'game quiz country', content: 'this is a game when you guess the country' })
    }
}
