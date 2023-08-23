import { TestBed } from '@angular/core/testing';

import { PatientInfoDaoService } from './patient-info-dao.service';

describe('PatientInfoDaoService', () => {
  let service: PatientInfoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientInfoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
