import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallGroupMembersComponent } from './small-group-members.component';

describe('SmallGroupMembersComponent', () => {
  let component: SmallGroupMembersComponent;
  let fixture: ComponentFixture<SmallGroupMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallGroupMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallGroupMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
