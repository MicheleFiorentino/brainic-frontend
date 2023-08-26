import { TestBed } from '@angular/core/testing';

import { MeasurementInfoService } from './measurement-info.service';

describe('MeasurementInfoService', () => {
  let service: MeasurementInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasurementInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
