import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingPersonComponent } from './existing-person.component';

describe('ExistingPersonComponent', () => {
  let component: ExistingPersonComponent;
  let fixture: ComponentFixture<ExistingPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
