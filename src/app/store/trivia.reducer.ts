import { createFeature, createReducer, on } from '@ngrx/store';
import { TriviaQuestion } from '../services/trivia.service';
import * as TriviaActions from './trivia.actions';

export interface TriviaState {
  questions: TriviaQuestion[];
  currentQuestion: number;
  totalQuestions: number;
  rightAnswers: number;
  results: QuestionResult[];
}

export interface QuestionResult {
  question: string;
  userAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
}

export const initialState: TriviaState = {
  questions: [],
  totalQuestions: 0,
  currentQuestion: 0,
  rightAnswers: 0,
  results: [],
};

const triviaFeature = createFeature({
  name: 'trivia',
  reducer: createReducer(
    initialState,
    on(TriviaActions.setQuestions, (state, { questions }) => ({
      ...state,
      questions,
      totalQuestions: questions.length,
    })),
    on(TriviaActions.submitAnswer, (state, { answer }) => {
      const correctAnswer =
        state.questions[state.currentQuestion].correctAnswer;
      const isCorrect = answer === correctAnswer;

      const updatedResults = [
        ...state.results,
        {
          question: state.questions[state.currentQuestion].question.text,
          userAnswer: answer,
          isCorrect: isCorrect,
          correctAnswer,
        },
      ];

      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        rightAnswers: isCorrect ? state.rightAnswers + 1 : state.rightAnswers,
        results: updatedResults,
      };
    }),
    on(TriviaActions.resetGame, () => initialState)
  ),
});

export const {
  name: triviaFeatureKey,
  reducer: triviaReducer,
  selectQuestions,
  selectTotalQuestions,
  selectCurrentQuestion,
  selectRightAnswers,
  selectResults,
} = triviaFeature;
