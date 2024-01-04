import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { QuestionComponent } from '../../components/question/question.component';
import { TriviaQuestion } from '../../services/trivia.service';
import {
  TriviaState,
  selectCurrentQuestion,
  selectQuestions,
  selectTotalQuestions,
} from '../../store/trivia.reducer';

@Component({
  selector: 'app-question-screen',
  standalone: true,
  imports: [QuestionComponent, CommonModule],
  templateUrl: './question-screen.component.html',
  styleUrl: './question-screen.component.scss',
})
export class QuestionScreenComponent {
  currentQuestionIndex$: Observable<number> = this.store.select(
    selectCurrentQuestion
  );
  questions$: Observable<TriviaQuestion[]> = this.store.select(selectQuestions);
  totalQuestions$: Observable<number> = this.store.select(selectTotalQuestions);
  currentQuestion$: Observable<TriviaQuestion | null> = combineLatest([
    this.currentQuestionIndex$,
    this.questions$,
  ]).pipe(
    map(([index, questions]) => {
      if (index === questions.length) {
        this.router.navigate(['/final-screen']);
        return null;
      }
      return questions && questions[index] ? questions[index] : null;
    })
  );

  constructor(private store: Store<TriviaState>, private router: Router) {}

  ngOnInit() {}
}
