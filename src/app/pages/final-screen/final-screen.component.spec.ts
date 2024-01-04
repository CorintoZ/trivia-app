import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { FinalScreenComponent } from './final-screen.component';

describe('FinalScreenComponent', () => {
  let component: FinalScreenComponent;
  let fixture: ComponentFixture<FinalScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalScreenComponent],
      providers: [provideMockStore(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FinalScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
