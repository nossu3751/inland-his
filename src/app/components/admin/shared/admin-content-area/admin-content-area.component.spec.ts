import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContentAreaComponent } from './admin-content-area.component';

describe('AdminContentAreaComponent', () => {
  let component: AdminContentAreaComponent;
  let fixture: ComponentFixture<AdminContentAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContentAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContentAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
