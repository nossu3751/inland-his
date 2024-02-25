import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleChallengeVerseComponent } from './bible-challenge-verse.component';

describe('BibleChallengeVerseComponent', () => {
  let component: BibleChallengeVerseComponent;
  let fixture: ComponentFixture<BibleChallengeVerseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibleChallengeVerseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibleChallengeVerseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
