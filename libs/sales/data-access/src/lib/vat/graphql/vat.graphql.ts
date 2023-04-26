import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiAllVatsResponseModel } from '@ui-frontend-service/sales/api-types';

/**
 * The query for fetching all vats.
 */
export const UI_ALL_VATS_QUERY = uiGql<UiAllVatsResponseModel, UiEmptyObject>`
  query allVats {
    allVats {
      id
      vat
      vatRemark
    }
  }
`;
