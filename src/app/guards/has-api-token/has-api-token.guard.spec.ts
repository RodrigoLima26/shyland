import { TestBed } from '@angular/core/testing';

import { HasApiTokenGuard } from './has-api-token.guard';

describe('HasApiTokenGuard', () => {
  let guard: HasApiTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasApiTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
