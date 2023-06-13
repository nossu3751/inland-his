import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingRedirectionComponent } from './offering-redirection.component';

describe('OfferingRedirectionComponent', () => {
  let component: OfferingRedirectionComponent;
  let fixture: ComponentFixture<OfferingRedirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferingRedirectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferingRedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
