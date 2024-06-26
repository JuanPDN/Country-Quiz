import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    response: boolean = false;
    questions: any[] = [];

    constructor(private dataService: GetDataService) {
        this.route.params.subscribe(params => {
            this.questionId = Number(params['questionId']);
        });
    }

    seeOptions(event: Event) {
        let response = (event.target as HTMLButtonElement).textContent
        if (!this.questions[this.questionId - 1].response) {
            this.questions[this.questionId - 1].yourAnswer = response
            this.questions[this.questionId - 1].response = true
        }
        console.log(this.questions);

    }

    ngOnInit(): void {
        this.dataService.getAllData().subscribe(
            (data) => {
                this.questions = data;

            }
        )

    }
}
