import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleVersesComponent } from './bible-verses.component';

describe('BibleVersesComponent', () => {
  let component: BibleVersesComponent;
  let fixture: ComponentFixture<BibleVersesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibleVersesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibleVersesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
