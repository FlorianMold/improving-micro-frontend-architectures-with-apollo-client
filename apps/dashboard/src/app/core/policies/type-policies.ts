import { UI_SHARED_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES } from '@ui-frontend-service/shared/data-access';
import { UI_CONTACT_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES } from '@ui-frontend-service/contact/data-access';
import { UI_CONTACT_TYPE_POLICIES } from './contact-widget.type-policies';
import { UI_ADDRESS_TYPE_POLICIES } from './address-widget.type-policies';
import { UI_SALES_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES } from '@ui-frontend-service/sales/data-access';
import { UI_PERSON_TYPE_POLICIES } from './person-widget.type-policies';
import { UI_USER_TYPE_POLICIES } from './user-widget.type-policies';
import { UI_SALES_TYPE_POLICIES } from './sales-widget.type-policies';
import { UI_INVOICE_TYPE_POLICIES } from './invoice-widget.type-policies';
import { UI_CONTACT_LIST_WIDGET_TYPE_POLICIES } from './contact-list-widget.type-policies';
import { UI_CONTRACT_TYPE_POLICIES } from './contract-widget.type-policies';

/**
 * Specifies all possible type-policies for the dashboard.
 * Is needed, when only the dashboard provides a single graphql-client.
 */
export const UI_DASHBOARD_APP_TYPE_POLICIES = {
  Query: {
    fields: {
      ...UI_SHARED_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES,
      ...UI_CONTACT_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES,
      ...UI_SALES_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES,
    },
  },
  ...UI_CONTACT_TYPE_POLICIES,
  ...UI_ADDRESS_TYPE_POLICIES,
  ...UI_PERSON_TYPE_POLICIES,
  ...UI_USER_TYPE_POLICIES,
  ...UI_SALES_TYPE_POLICIES,
  ...UI_INVOICE_TYPE_POLICIES,
  ...UI_CONTRACT_TYPE_POLICIES,
  ...UI_CONTACT_LIST_WIDGET_TYPE_POLICIES,
};
