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
            this.nextQuestion()
        }
    }

    nextQuestion() {
        setTimeout(() => {
            if (this.questionId < 10) {
                this.router.navigate(['/game', this.questionId + 1])
            }
        }, 1500)
    }


    ngOnInit(): void {
        this.dataService.getAllData().subscribe((data) =>
            this.questions = data)
    }
}
