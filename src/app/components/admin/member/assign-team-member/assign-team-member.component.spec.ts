import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTeamMemberComponent } from './assign-team-member.component';

describe('AssignTeamMemberComponent', () => {
  let component: AssignTeamMemberComponent;
  let fixture: ComponentFixture<AssignTeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTeamMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
