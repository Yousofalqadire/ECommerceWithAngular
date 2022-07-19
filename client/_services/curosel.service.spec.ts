import { TestBed } from '@angular/core/testing';

import { CuroselService } from './curosel.service';

describe('CuroselService', () => {
  let service: CuroselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuroselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
