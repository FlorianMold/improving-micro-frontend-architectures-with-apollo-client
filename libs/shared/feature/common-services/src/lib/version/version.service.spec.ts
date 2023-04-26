import { TestBed } from '@angular/core/testing';

import { UiCommonVersionService } from './version.service';

describe('VersionService', () => {
  let service: UiCommonVersionService<string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiCommonVersionService],
    });
    service = TestBed.inject(UiCommonVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
