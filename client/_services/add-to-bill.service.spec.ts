import { TestBed } from '@angular/core/testing';

import { AddToBillService } from './add-to-bill.service';

describe('AddToBillService', () => {
  let service: AddToBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
