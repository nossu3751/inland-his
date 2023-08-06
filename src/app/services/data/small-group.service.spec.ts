import { TestBed } from '@angular/core/testing';

import { SmallGroupService } from './small-group.service';

describe('SmallGroupService', () => {
  let service: SmallGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmallGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
