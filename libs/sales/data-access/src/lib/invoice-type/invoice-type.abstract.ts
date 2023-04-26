import { Observable } from 'rxjs';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiAllInvoiceTypesResponseModel } from '@ui-frontend-service/sales/api-types';

export abstract class UiSalesDataAccessInvoiceTypeService {
  /**
   * Fetches all invoice-types.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allInvoiceTypes(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllInvoiceTypesResponseModel>
  ): Observable<UiAllInvoiceTypesResponseModel>;
}
