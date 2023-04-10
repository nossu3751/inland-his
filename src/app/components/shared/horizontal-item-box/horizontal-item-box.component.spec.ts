import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalItemBoxComponent } from './horizontal-item-box.component';

describe('HorizontalItemBoxComponent', () => {
  let component: HorizontalItemBoxComponent;
  let fixture: ComponentFixture<HorizontalItemBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalItemBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalItemBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
