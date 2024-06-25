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

    seeOptions(){
        console.log(this.questions);
        
    }
    randomCountries(): number {
        return Math.floor(Math.random() * 250) + 1;
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

                    let options = [item]
                    while (options.length < 4) {
                        let randomIndex = this.randomCountries();
                        if (!options.includes(data[randomIndex])) {
                            options.push(data[randomIndex]);
                        }
                    }

                    options = this.shuffle(options);                    

                    return {
                        name: item.name.common,
                        capital: item.capital,
                        flag: item.flag,
                        options: options,
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
