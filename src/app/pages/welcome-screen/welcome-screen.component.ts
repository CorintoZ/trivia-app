import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { TriviaCategory } from '../../services/trivia.service';
import { loadQuestions } from '../../store/trivia.actions';
import { TriviaState } from '../../store/trivia.reducer';

@Component({
  selector: 'app-welcome-screen',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './welcome-screen.component.html',
  styleUrl: './welcome-screen.component.scss',
})
export class WelcomeScreenComponent implements OnInit {
  welcomeForm: FormGroup = new FormGroup({});

  triviaCategories = Object.entries(TriviaCategory);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<TriviaState>
  ) {}

  ngOnInit() {
    this.welcomeForm = this.formBuilder.group({
      numQuestions: [5, Validators.required],
      difficulty: ['medium', Validators.required],
      category: [TriviaCategory.GeneralKnowledge, Validators.required],
    });
  }

  startGame() {
    const limit = this.welcomeForm.value.numQuestions as number;
    const difficulty = this.welcomeForm.value.difficulty as string;
    const category = this.welcomeForm.value.category as string;

    this.store.dispatch(loadQuestions({ category, difficulty, limit }));
  }
}
