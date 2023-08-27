import { TestBed } from '@angular/core/testing';

import { PatientDashboardDaoService } from './patient-dashboard-dao.service';

describe('PatientDashboardDaoService', () => {
  let service: PatientDashboardDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientDashboardDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
