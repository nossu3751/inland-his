import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtRedirectionComponent } from './qt-redirection.component';

describe('QtRedirectionComponent', () => {
  let component: QtRedirectionComponent;
  let fixture: ComponentFixture<QtRedirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtRedirectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtRedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
