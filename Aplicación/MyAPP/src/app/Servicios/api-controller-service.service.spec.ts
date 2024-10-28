import { TestBed } from '@angular/core/testing';

import { ApiControllerServiceService } from './api-controller-service.service';

describe('ApiControllerServiceService', () => {
  let service: ApiControllerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiControllerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
