import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallGroupInfoComponent } from './small-group-info.component';

describe('SmallGroupInfoComponent', () => {
  let component: SmallGroupInfoComponent;
  let fixture: ComponentFixture<SmallGroupInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallGroupInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallGroupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
