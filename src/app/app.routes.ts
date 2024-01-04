import { Routes } from '@angular/router';
import { FinalScreenComponent } from './pages/final-screen/final-screen.component';
import { QuestionScreenComponent } from './pages/question-screen/question-screen.component';
import { WelcomeScreenComponent } from './pages/welcome-screen/welcome-screen.component';
import { canActivateGuard } from './services/can-activate.guard';

export const routes: Routes = [
  { path: '', component: WelcomeScreenComponent },
  {
    path: 'question-screen',
    component: QuestionScreenComponent,
    canActivate: [canActivateGuard],
  },
  {
    path: 'final-screen',
    component: FinalScreenComponent,
    canActivate: [canActivateGuard],
  },
];
