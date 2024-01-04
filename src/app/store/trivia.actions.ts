import { createAction, props } from '@ngrx/store';

export const loadQuestions = createAction(
  '[Question] Load Questions',
  props<{ category?: string; difficulty?: string; limit?: number }>()
);
export const setQuestions = createAction(
  '[Question] Set Questions',
  props<{ questions: any[] }>()
);
export const submitAnswer = createAction(
  '[Question] Submit Answer',
  props<{ answer: string }>()
);
export const resetGame = createAction('[Question] Reset Game');
