import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletSvgComponent } from './leaflet-svg.component';

describe('LeafletSvgComponent', () => {
  let component: LeafletSvgComponent;
  let fixture: ComponentFixture<LeafletSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeafletSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeafletSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
