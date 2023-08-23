import { TestBed } from '@angular/core/testing';

import { DoctorInfoDaoService } from './doctor-info-dao.service';

describe('DoctorInfoDaoService', () => {
  let service: DoctorInfoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorInfoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
