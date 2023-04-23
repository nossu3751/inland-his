import { TestBed } from '@angular/core/testing';

import { ComponentWidthService } from './component-width.service';

describe('ComponentWidthService', () => {
  let service: ComponentWidthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentWidthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
