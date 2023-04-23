import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerSvgComponent } from './prayer-svg.component';

describe('PrayerSvgComponent', () => {
  let component: PrayerSvgComponent;
  let fixture: ComponentFixture<PrayerSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrayerSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrayerSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
