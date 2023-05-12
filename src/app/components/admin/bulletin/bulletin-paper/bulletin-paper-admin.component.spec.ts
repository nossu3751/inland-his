import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinPaperAdminComponent } from './bulletin-paper-admin.component';

describe('BulletinPaperAdminComponent', () => {
  let component: BulletinPaperAdminComponent;
  let fixture: ComponentFixture<BulletinPaperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulletinPaperAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulletinPaperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
