import { TestBed } from '@angular/core/testing';

import { AuthDaoService } from './auth-dao.service';

describe('AuthDaoService', () => {
  let service: AuthDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
