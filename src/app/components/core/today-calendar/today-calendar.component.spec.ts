import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayCalendarComponent } from './today-calendar.component';

describe('TodayCalendarComponent', () => {
  let component: TodayCalendarComponent;
  let fixture: ComponentFixture<TodayCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
