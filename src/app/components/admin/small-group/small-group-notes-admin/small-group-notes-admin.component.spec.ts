import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallGroupNotesAdminComponent } from './small-group-notes-admin.component';

describe('SmallGroupNotesAdminComponent', () => {
  let component: SmallGroupNotesAdminComponent;
  let fixture: ComponentFixture<SmallGroupNotesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallGroupNotesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallGroupNotesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
