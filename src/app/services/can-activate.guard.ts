import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { selectQuestions } from '../store/trivia.reducer';

export const canActivateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return checkQuestionsLoaded().pipe(
    switchMap((questionsLoaded) => {
      if (!questionsLoaded) {
        router.navigate(['']);
        return of(false);
      }
      return of(true);
    }),
    catchError((err) => {
      return of(false);
    })
  );
};

function checkQuestionsLoaded(): Observable<boolean> {
  const store = inject(Store);
  return store.pipe(
    select(selectQuestions),
    take(1),
    switchMap((questions) => of(!!questions.length))
  );
}
