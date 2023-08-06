import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleRedirectionComponent } from './bible-redirection.component';

describe('BibleRedirectionComponent', () => {
  let component: BibleRedirectionComponent;
  let fixture: ComponentFixture<BibleRedirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibleRedirectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibleRedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
