import { TestBed } from '@angular/core/testing';

import { CentrosAcopioService } from './centrosacopio.service';

describe('CentrosAcopioService', () => {
  let service: CentrosAcopioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentrosAcopioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
