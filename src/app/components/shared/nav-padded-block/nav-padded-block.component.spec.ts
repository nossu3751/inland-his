import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPaddedBlockComponent } from './nav-padded-block.component';

describe('NavPaddedBlockComponent', () => {
  let component: NavPaddedBlockComponent;
  let fixture: ComponentFixture<NavPaddedBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavPaddedBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavPaddedBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
