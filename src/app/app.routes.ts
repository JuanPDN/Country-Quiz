import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { FinishComponent } from './finish/finish.component';

export const routes: Routes = [
    {
        path: 'game/:questionId',
        component: GameComponent
    },
    {
        path: '',
        redirectTo: 'game/1',
        pathMatch: 'full'
    },
    {
        path: 'score',
        component: FinishComponent,
        pathMatch: 'full'
    }   
];
