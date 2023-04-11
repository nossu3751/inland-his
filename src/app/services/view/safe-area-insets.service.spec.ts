import { TestBed } from '@angular/core/testing';

import { SafeAreaInsetsService } from './safe-area-insets.service';

describe('SafeAreaInsetsService', () => {
  let service: SafeAreaInsetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafeAreaInsetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
