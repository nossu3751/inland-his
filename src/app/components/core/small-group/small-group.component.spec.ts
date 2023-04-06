import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallGroupComponent } from './small-group.component';

describe('SmallGroupComponent', () => {
  let component: SmallGroupComponent;
  let fixture: ComponentFixture<SmallGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
