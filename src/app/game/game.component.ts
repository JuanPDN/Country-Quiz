import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NavbarComponent } from "../navbar/navbar.component";
import { GetDataService } from '../services/get-data.service';



@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrl: './game.component.css',
    imports: [NavbarComponent]
})
export class GameComponent implements OnInit {
    route: ActivatedRoute = inject(ActivatedRoute);
    questionId: number = 1;
    questions: any[] = [];
    correctAnsewrs: number = 0;
    totalResponses: number = 0;

    constructor(private dataService: GetDataService, private router: Router) {
        this.route.params.subscribe(params =>
            this.questionId = Number(params['questionId'])
        );
    }

    submitAnswer(event: Event) {
        let response = (event.target as HTMLButtonElement).textContent
        if (!this.questions[this.questionId - 1].response) {
            this.questions[this.questionId - 1].yourAnswer = response?.trim();
            this.questions[this.questionId - 1].response = true;
            if (this.totalResponses < 10) {
                this.nextQuestion()
            }
        }
        this.validateAnswer()
    }

    validateAnswer() {
        this.totalResponses++
        const yourAnswer = this.questions[this.questionId - 1].yourAnswer
        const answer = this.questions[this.questionId - 1].answer
        if (yourAnswer === answer) {
            this.correctAnsewrs++
        }
        if (this.totalResponses === 10) {
            setTimeout(() => {
                this.router.navigate(['finish'])
            },1500)
        }
    }

    nextQuestion() {
        setTimeout(() => {
            if (this.questionId < 10) {
                this.router.navigate(['/score', this.questionId + 1])
            }
        }, 1500)
    }

    ngOnInit(): void {
        this.dataService.getAllData().subscribe((data) =>
            this.questions = data)
    }
}
