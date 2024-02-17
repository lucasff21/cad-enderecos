import { TestBed } from '@angular/core/testing';

import { EnderecoResolver } from './endereco.resolver';

describe('EnderecoResolver', () => {
  let resolver: EnderecoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EnderecoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
