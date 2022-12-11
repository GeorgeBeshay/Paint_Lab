import { TestBed } from '@angular/core/testing';

import { BackEndCallerService } from './back-end-caller.service';

describe('BackEndCallerService', () => {
  let service: BackEndCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackEndCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
