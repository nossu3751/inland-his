import { TestBed } from '@angular/core/testing';

import { NewComerService } from './new-comer.service';

describe('NewComerService', () => {
  let service: NewComerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewComerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
