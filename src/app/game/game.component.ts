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
    randomCountries(maxNum:number, minNum:number): number {
        return Math.floor(Math.random() * maxNum) + minNum;
    }

    shuffle(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    ngOnInit(): void {
        this.dataService.getAllData().subscribe(
            (data) => {
                let response = data.map((item: any) => {
                    let questionNumber = Math.floor(Math.random() * 3) + 1
                    let options = [item]
                    let question = ""
                    let answer = ""

                    while (options.length < 4) {
                        let randomIndex = this.randomCountries(data.length, 1);
                        if (!options.includes(data[randomIndex])) {
                            options.push(data[randomIndex]);
                        }
                    }

                    options = this.shuffle(options);
                    question = questionNumber == 1 ? `Which country is ${item.capital} the capital of?`
                        : questionNumber == 2 ? `Which country does this flag ${item.flag} belong to?`
                            : `Which city is the capital of ${item.name.common}?`
                    answer = questionNumber !== 3 ? item.name.common : item.capital

                    return {
                        question: question,
                        name: item.name.common,
                        capital: item.capital,
                        flag: item.flag,
                        options: options,
                        questionNumber: questionNumber,
                        answer: answer,
                        yourAnswer: null,
                        response: false,
                    }
                })
                for (let i = 0; i < 10; i++) {
                    let randomIndex = this.randomCountries(data.length, 1);
                    this.questions.push(response[randomIndex]);
                }
            }
        );
    }
}
