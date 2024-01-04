import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { TriviaCategory, TriviaService } from '../services/trivia.service';
import * as QuestionActions from './trivia.actions';

@Injectable()
export class QuestionEffects {
  loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.loadQuestions),
      mergeMap(({ category, difficulty, limit }) => {
        return this.triviaService
          .getQuestions(category as TriviaCategory, difficulty, limit)
          .pipe(
            map((questions) => QuestionActions.setQuestions({ questions })),
            tap(() => this.router.navigate(['/question-screen']))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private triviaService: TriviaService,
    private router: Router
  ) {}
}
