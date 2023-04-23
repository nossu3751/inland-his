import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleSvgComponent } from './bible-svg.component';

describe('BibleSvgComponent', () => {
  let component: BibleSvgComponent;
  let fixture: ComponentFixture<BibleSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibleSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibleSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
