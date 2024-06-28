import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { FinishComponent } from './finish/finish.component';

export const routes: Routes = [
    {
        path: 'game/:questionId',
        title: 'Country Quiz - Game',
        component: GameComponent
    },
    {
        path: 'score',
        component: FinishComponent,
        title: 'Country Quiz - Score',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'game/1',
        pathMatch: 'full'
    },

];
