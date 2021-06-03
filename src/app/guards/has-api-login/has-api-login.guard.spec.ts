import { TestBed } from '@angular/core/testing';

import { HasApiLoginGuard } from './has-api-login.guard';

describe('HasApiLoginGuard', () => {
  let guard: HasApiLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasApiLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
