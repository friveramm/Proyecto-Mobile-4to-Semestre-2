import { TestBed } from '@angular/core/testing';

import { ApiControllerServiceService } from './api-controller-service.service';

import { provideHttpClient } from '@angular/common/http';

describe('ApiControllerServiceService', () => {
  let service: ApiControllerServiceService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(ApiControllerServiceService);
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    }).compileComponents;
    service = TestBed.inject(ApiControllerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
