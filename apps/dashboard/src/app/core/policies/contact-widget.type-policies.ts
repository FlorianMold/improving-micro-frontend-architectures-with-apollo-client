import { UI_CONTACT_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES } from '@ui-frontend-service/contact/data-access';
import { UI_SHARED_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES } from '@ui-frontend-service/shared/data-access';
import { UiTypePolicies } from '@ui-frontend-service/shared/types/graphql-client-types';

/**
 * The type-policies for accessing the contact-data inside the cache.
 */
const ROOT_QUERY_FIELD_POLICIES = {
  Query: {
    fields: {
      ...UI_SHARED_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES,
      ...UI_CONTACT_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES,
    },
  },
};

/**
 * Specifies all possibles type-policies and field-policies for the contact-widget.
 */
export const UI_CONTACT_TYPE_POLICIES: UiTypePolicies = {};

/**
 * Specifies all possibles type-policies and field-policies for the contact-widget.
 */
export const UI_CONTACT_WIDGET_TYPE_POLICIES: UiTypePolicies = {
  ...ROOT_QUERY_FIELD_POLICIES,
  ...UI_CONTACT_TYPE_POLICIES,
};
