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
    questions: any[] = [];

    constructor(private dataService: GetDataService) {
        this.route.params.subscribe(params => {
            this.questionId = Number(params['questionId']);
        });
    }
    randomCountries(): number {
        return Math.floor(Math.random() * 250) + 1;
    }
    ngOnInit(): void {
        this.dataService.getAllData().subscribe(
            (data) => {
                let response = data.map((item: any) => {
                    return {
                        name: item.name.common,
                        capital: item.capital,
                        flag: item.flag,
                        options: Array.from({ length: 3 }, () => data[this.randomCountries()]),
                        questionNumber: Math.floor(Math.random() * 3) + 1,
                    }
                })
                for (let i = 0; i < 10; i++) {
                    let randomIndex = this.randomCountries();
                    this.questions.push(response[randomIndex]);
                }
            }
        );
    }
}
