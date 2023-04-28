import { TestBed } from '@angular/core/testing';

import { SmallGroupNoteService } from './small-group-note.service';

describe('SmallGroupNoteService', () => {
  let service: SmallGroupNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmallGroupNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
