import { TestBed } from '@angular/core/testing';

import { SmallGroupDiscussionService } from './small-group-discussion.service';

describe('SmallGroupDiscussionService', () => {
  let service: SmallGroupDiscussionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmallGroupDiscussionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
