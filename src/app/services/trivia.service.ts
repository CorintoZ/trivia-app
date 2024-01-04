import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export type TriviaQuestion = {
  category: string;
  type: string;
  difficulty: string;
  question: {
    text: string;
  };
  correctAnswer: string;
  incorrectAnswers: string[];
};

export enum TriviaCategory {
  Music = 'music',
  SportAndLeisure = 'sport_and_leisure',
  FilmAndTV = 'film_and_tv',
  ArtsAndLiterature = 'arts_and_literature',
  History = 'history',
  SocietyAndCulture = 'society_and_culture',
  Science = 'science',
  Geography = 'geography',
  FoodAndDrink = 'food_and_drink',
  GeneralKnowledge = 'general_knowledge',
}

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  private apiUrl = 'https://the-trivia-api.com/v2/questions';

  constructor(private http: HttpClient) {}

  getQuestions(
    category: TriviaCategory | null = null,
    difficulty: string = 'medium',
    limit: number = 10
  ): Observable<TriviaQuestion[]> {
    let params = new HttpParams();
    if (category) {
      params = params.set('categories', category);
    }
    if (difficulty) {
      params = params.set('difficulties', difficulty);
    }
    if (limit) {
      params = params.set('limit', limit.toString());
    }

    return this.http
      .get<TriviaQuestion[]>(this.apiUrl, { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
