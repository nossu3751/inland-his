import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComerComponent } from './new-comer.component';

describe('NewComerComponent', () => {
  let component: NewComerComponent;
  let fixture: ComponentFixture<NewComerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewComerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewComerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
