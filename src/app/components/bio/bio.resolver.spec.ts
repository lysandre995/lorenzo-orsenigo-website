import { TestBed } from '@angular/core/testing';

import { BioResolver } from './bio.resolver';

describe('BioResolver', () => {
  let resolver: BioResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BioResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
