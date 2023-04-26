import { Injectable } from '@angular/core';
import { UiCommonStorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UiCommonSessionStorageService extends UiCommonStorageService {
  constructor() {
    super(sessionStorage);
  }
}
