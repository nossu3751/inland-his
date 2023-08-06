import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallGroupMembersSearchComponent } from './small-group-members-search.component';

describe('SmallGroupMembersSearchComponent', () => {
  let component: SmallGroupMembersSearchComponent;
  let fixture: ComponentFixture<SmallGroupMembersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallGroupMembersSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallGroupMembersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
