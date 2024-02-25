import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleChallengeComponent } from './bible-challenge.component';

describe('BibleChallengeComponent', () => {
  let component: BibleChallengeComponent;
  let fixture: ComponentFixture<BibleChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibleChallengeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibleChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
