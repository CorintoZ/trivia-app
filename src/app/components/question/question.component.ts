import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { TriviaQuestion } from '../../services/trivia.service';
import { submitAnswer } from '../../store/trivia.actions';
import { TriviaState } from '../../store/trivia.reducer';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  @Input() question!: TriviaQuestion;

  questionForm: FormGroup = new FormGroup({});
  answerOptions: string[] = [];
  formSubmitted = false;
  selectedAnswer = '';
  correctAnswer = '';

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private store: Store<TriviaState>) {}

  ngOnInit() {
    this.questionForm = this.fb.group({
      selectedAnswer: [null, Validators.required],
    });
    this.questionForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.selectedAnswer = this.questionForm.get('selectedAnswer')?.value;
      });
  }

  ngOnChanges() {
    this.getAnswerOptions();
    this.questionForm.reset();
    this.formSubmitted = false;
    this.questionForm.enable();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.formSubmitted) {
      this.store.dispatch(submitAnswer({ answer: this.selectedAnswer }));
    }
    this.formSubmitted = true;
    this.questionForm.disable();
  }

  getAnswerOptions() {
    this.correctAnswer = '';
    this.answerOptions = [];
    this.correctAnswer = this.question.correctAnswer;
    this.answerOptions.push(
      this.question.correctAnswer,
      ...this.question.incorrectAnswers
    );
    this.answerOptions.sort(() => Math.random() - 0.5);
  }
}
