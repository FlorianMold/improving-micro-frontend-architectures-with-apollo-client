import { UI_AUTHENTICATION_ROOT_QUERY_FIELD_POLICY } from './global-state';
import { UI_USER_ROOT_QUERY_FIELD_POLICY } from './user';
import { UiFieldPolicy, UiFieldReadFunction } from '@ui-frontend-service/shared/types/graphql-client-types';

/**
 * Provides all type-policies for accessing data inside the cache.
 * This field-policy should be used in every application that uses the shared data-access-service.
 */
export const UI_SHARED_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES: {
  [fieldName: string]: UiFieldPolicy | UiFieldReadFunction;
} = {
  ...UI_USER_ROOT_QUERY_FIELD_POLICY,
  ...UI_AUTHENTICATION_ROOT_QUERY_FIELD_POLICY,
};
