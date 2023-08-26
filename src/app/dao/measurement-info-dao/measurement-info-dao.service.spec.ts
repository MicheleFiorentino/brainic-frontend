import { TestBed } from '@angular/core/testing';

import { MeasurementInfoDaoService } from './measurement-info-dao.service';

describe('MeasurementInfoDaoService', () => {
  let service: MeasurementInfoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasurementInfoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
