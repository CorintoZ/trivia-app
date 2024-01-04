import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';

import { Store } from '@ngrx/store';
import { TriviaQuestion } from '../../services/trivia.service';
import * as TriviaActions from '../../store/trivia.actions';
import { QuestionComponent } from './question.component';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, QuestionComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    component.question = {
      category: 'Test Category',
      type: 'multiple',
      difficulty: 'easy',
      question: { text: 'Test question' },
      correctAnswer: 'Test answer',
      incorrectAnswers: ['Wrong answer 1', 'Wrong answer 2', 'Wrong answer 3'],
    };
    const store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize questionForm with selectedAnswer as null', () => {
    expect(component.questionForm.get('selectedAnswer')?.value).toBeNull();
  });

  it('should update selectedAnswer when questionForm value changes', () => {
    const selectedAnswer = 'Option A';
    component.questionForm.get('selectedAnswer')?.setValue(selectedAnswer);
    expect(component.selectedAnswer).toBe(selectedAnswer);
  });

  it('should reset questionForm, set formSubmitted to false, and enable questionForm when ngOnChanges is called', () => {
    component.questionForm.get('selectedAnswer')?.setValue('Option A');
    component.formSubmitted = true;
    component.questionForm.disable();

    component.ngOnChanges();

    expect(component.questionForm.get('selectedAnswer')?.value).toBeNull();
    expect(component.formSubmitted).toBe(false);
    expect(component.questionForm.enabled).toBe(true);
  });

  it('should dispatch submitAnswer action when onSubmit is called and formSubmitted is true', () => {
    component.formSubmitted = true;
    component.selectedAnswer = 'Option A';

    component.onSubmit();
    expect(dispatchSpy).toHaveBeenCalledWith(
      TriviaActions.submitAnswer({ answer: 'Option A' })
    );
  });

  it('should set formSubmitted to true and disable questionForm when onSubmit is called', () => {
    component.formSubmitted = false;
    component.questionForm.enable();

    component.onSubmit();

    expect(component.formSubmitted).toBe(true);
    expect(component.questionForm.disabled).toBe(true);
  });

  it('should set correctAnswer and answerOptions when getAnswerOptions is called', () => {
    const question: TriviaQuestion = {
      category: '',
      type: '',
      difficulty: '',
      question: {
        text: '',
      },
      correctAnswer: 'Option A',
      incorrectAnswers: ['Option B', 'Option C'],
    };
    component.question = question;

    component.getAnswerOptions();

    expect(component.correctAnswer).toBe(question.correctAnswer);
    expect(component.answerOptions.sort()).toEqual(
      [question.correctAnswer, ...question.incorrectAnswers].sort()
    );
  });
});
