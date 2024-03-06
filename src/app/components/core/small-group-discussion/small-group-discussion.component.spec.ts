import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallGroupDiscussionComponent } from './small-group-discussion.component';

describe('SmallGroupDiscussionComponent', () => {
  let component: SmallGroupDiscussionComponent;
  let fixture: ComponentFixture<SmallGroupDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallGroupDiscussionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallGroupDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
