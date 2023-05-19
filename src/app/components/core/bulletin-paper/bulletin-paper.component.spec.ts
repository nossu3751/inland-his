import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinPaperComponent } from './bulletin-paper.component';

describe('BulletinPaperComponent', () => {
  let component: BulletinPaperComponent;
  let fixture: ComponentFixture<BulletinPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulletinPaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulletinPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
