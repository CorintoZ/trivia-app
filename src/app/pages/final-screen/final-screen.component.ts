import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { resetGame } from '../../store/trivia.actions';
import {
  QuestionResult,
  TriviaState,
  selectResults,
  selectRightAnswers,
  selectTotalQuestions,
} from '../../store/trivia.reducer';

@Component({
  selector: 'app-final-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './final-screen.component.html',
  styleUrl: './final-screen.component.scss',
})
export class FinalScreenComponent {
  rightAnswers$: Observable<number>;
  totalQuestions$: Observable<number>;
  successRate$: Observable<number>;
  results$: Observable<QuestionResult[]>;

  constructor(private store: Store<TriviaState>, private router: Router) {
    this.results$ = this.store.select(selectResults);
    this.totalQuestions$ = this.store.select(selectTotalQuestions);
    this.successRate$ = this.store.select(selectRightAnswers);
    this.rightAnswers$ = this.store.select(selectRightAnswers);
  }

  goToWelcomeScreen() {
    this.router.navigate(['']).finally(() => this.store.dispatch(resetGame()));
  }
}
