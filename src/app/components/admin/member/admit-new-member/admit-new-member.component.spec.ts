import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitNewMemberComponent } from './admit-new-member.component';

describe('AdmitNewMemberComponent', () => {
  let component: AdmitNewMemberComponent;
  let fixture: ComponentFixture<AdmitNewMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmitNewMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmitNewMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
