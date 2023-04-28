import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallGroupNoteComponent } from './small-group-note.component';

describe('SmallGroupNoteComponent', () => {
  let component: SmallGroupNoteComponent;
  let fixture: ComponentFixture<SmallGroupNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallGroupNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallGroupNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
