import { UiTypePolicies } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UI_SHARED_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES } from '@ui-frontend-service/shared/data-access';
import {
  UI_SALES_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES,
  UI_SALES_DATA_ACCESS_SERVICE_TYPE_POLICIES,
} from '@ui-frontend-service/sales/data-access';

/**
 * The type-policies for accessing the sales-data inside the cache.
 */
const ROOT_QUERY_FIELD_POLICIES: UiTypePolicies = {
  Query: {
    fields: {
      ...UI_SHARED_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES,
      ...UI_SALES_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES,
    },
  },
};

/**
 * Specifies all possibles type-policies and field-policies for the sales-app.
 */
export const UI_SALES_APP_TYPE_POLICIES: UiTypePolicies = {
  ...ROOT_QUERY_FIELD_POLICIES,
  ...UI_SALES_DATA_ACCESS_SERVICE_TYPE_POLICIES,
};
