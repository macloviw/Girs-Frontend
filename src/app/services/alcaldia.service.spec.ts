import { TestBed } from '@angular/core/testing';

import { AlcaldiasService } from './alcaldia.service';

describe('AlcaldiaService', () => {
  let service: AlcaldiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlcaldiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
