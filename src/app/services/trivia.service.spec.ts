import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TriviaCategory, TriviaService } from './trivia.service';

describe('TriviaService', () => {
  let triviaService: TriviaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TriviaService],
    });

    triviaService = TestBed.inject(TriviaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(triviaService).toBeTruthy();
  });

  it('should make a GET request to the trivia API with the correct parameters', () => {
    const category = TriviaCategory.Music;
    const difficulty = 'easy';
    const limit = 5;

    const expectedUrl = `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${difficulty}&limit=${limit}`;
    triviaService.getQuestions(category, difficulty, limit).subscribe();

    const req = httpTestingController.expectOne(
      ({ urlWithParams }) => urlWithParams === expectedUrl
    );
    expect(req.request.method).toBe('GET');

    req.flush([]);
  });

  it('should handle HTTP errors and return an error Observable', () => {
    const errorResponse = new ErrorEvent('Network error');
    const category = TriviaCategory.FilmAndTV;

    triviaService.getQuestions(category).subscribe({
      next: () => fail('Expected an error, but got a successful response'),
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe(
          'Something bad happened; please try again later.'
        );
      },
    });

    const req = httpTestingController.expectOne(
      'https://the-trivia-api.com/v2/questions?categories=film_and_tv&difficulties=medium&limit=10'
    );
    req.error(errorResponse);
  });
});
