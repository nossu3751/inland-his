import { TestBed } from '@angular/core/testing';

import { BibleChallengeService } from './bible-challenge.service';

describe('BibleChallengeService', () => {
  let service: BibleChallengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibleChallengeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
