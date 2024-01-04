import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadQuestions } from '../../store/trivia.actions';
import { WelcomeScreenComponent } from './welcome-screen.component';

describe('WelcomeScreenComponent', () => {
  let component: WelcomeScreenComponent;
  let fixture: ComponentFixture<WelcomeScreenComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, WelcomeScreenComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeScreenComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadQuestions action on startGame', () => {
    const category = 'General Knowledge';
    const difficulty = 'easy';
    const limit = 10;

    jest.spyOn(store, 'dispatch');
    component.welcomeForm.setValue({
      category,
      difficulty,
      numQuestions: limit,
    });

    component.startGame();

    expect(store.dispatch).toHaveBeenCalledWith(
      loadQuestions({ category, difficulty, limit })
    );
  });
});
