import { TestBed } from '@angular/core/testing';
import { UiCommonSessionStorageService } from './session-storage.service';

describe('LocalStorageService', () => {
  let service: UiCommonSessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiCommonSessionStorageService],
    });
    service = TestBed.inject(UiCommonSessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
