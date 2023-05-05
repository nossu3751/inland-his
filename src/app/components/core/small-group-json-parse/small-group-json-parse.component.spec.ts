import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallGroupJsonParseComponent } from './small-group-json-parse.component';

describe('SmallGroupJsonParseComponent', () => {
  let component: SmallGroupJsonParseComponent;
  let fixture: ComponentFixture<SmallGroupJsonParseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallGroupJsonParseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallGroupJsonParseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
