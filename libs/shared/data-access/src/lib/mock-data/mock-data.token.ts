import { InjectionToken } from '@angular/core';
import UI_USERS_MOCK_DATA from './user-mock.data.json';
import UI_ADDRESSES_MOCK_DATA from './address-mock.data.json';
import { UiSharedAddressModel, UiSharedUserModel } from '@ui-frontend-service/shared/api-types';

/** The mocked data of the shared-service. */
export interface UiContactMockData {
  users: UiSharedUserModel[];
  addresses: UiSharedAddressModel[];
}

/** Injection token that can be used to inject mock-data. */
export const UI_SHARED_MOCK_DATA_TOKEN = new InjectionToken<UiContactMockData>('UI_SHARED_MOCK_DATA');

export const mockData: UiContactMockData = {
  users: UI_USERS_MOCK_DATA,
  addresses: UI_ADDRESSES_MOCK_DATA,
};

/** Provider that provides the shared mock-data. */
export const UI_SHARED_MOCK_DATA_PROVIDER = {
  provide: UI_SHARED_MOCK_DATA_TOKEN,
  useValue: mockData,
};
