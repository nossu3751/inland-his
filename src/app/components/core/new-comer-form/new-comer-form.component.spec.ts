import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComerFormComponent } from './new-comer-form.component';

describe('NewComerFormComponent', () => {
  let component: NewComerFormComponent;
  let fixture: ComponentFixture<NewComerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewComerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewComerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
