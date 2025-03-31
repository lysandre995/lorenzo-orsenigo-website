import { TestBed } from '@angular/core/testing';

import { PhdProjectsService } from './phd-projects.service';

describe('PhdProjectsService', () => {
  let service: PhdProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhdProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
