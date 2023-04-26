import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiAllInvoiceTypesResponseModel } from '@ui-frontend-service/sales/api-types';

/**
 * The query for fetching all vats.
 */
export const UI_ALL_INVOICE_TYPES_QUERY = uiGql<UiAllInvoiceTypesResponseModel, UiEmptyObject>`
  query allInvoiceTypes {
    allInvoiceTypes {
      id
    }
  }
`;
