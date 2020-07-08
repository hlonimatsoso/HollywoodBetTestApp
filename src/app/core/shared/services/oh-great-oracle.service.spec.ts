import { TestBed } from '@angular/core/testing';

import { OhGreatOracleService } from './oh-great-oracle.service';

describe('OhGreatOracleService', () => {
  let service: OhGreatOracleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OhGreatOracleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
