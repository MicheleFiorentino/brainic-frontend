import { TestBed } from '@angular/core/testing';

import { PatientsListDaoService } from './patients-list-dao.service';

describe('PatientsListDaoService', () => {
  let service: PatientsListDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsListDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
