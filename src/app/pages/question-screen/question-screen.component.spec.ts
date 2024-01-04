import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { QuestionScreenComponent } from './question-screen.component';

describe('QuestionScreenComponent', () => {
  let component: QuestionScreenComponent;
  let fixture: ComponentFixture<QuestionScreenComponent>;
  let mockStore: Partial<Store>;

  beforeEach(async () => {
    mockStore = {
      select: jest.fn().mockReturnValue(of(0)),
    };

    await TestBed.configureTestingModule({
      imports: [QuestionScreenComponent],
      providers: [provideMockStore(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
